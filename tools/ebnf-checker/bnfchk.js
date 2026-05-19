function htmlescape(s) {
	return s.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}


/**
 * Base class for a single BNF element.
 */
class Node {
	
	/**
	 * Returns this node formatted according to the parameters.
	 * @param {bool} html  HTML if true, text if false.
	 * @param {bool} with_idx  With appended rule index.
	 * @returns {string}  Formatted rule.
	 */
	format(html, with_idx) {
		throw new Error("missing method implementation");
	}
}

/**
 * Rule name and its definition.
 */
class RuleNode extends Node {
	
	name = ""; // name of the rule
	expr = null; // its definition, Node
	defined_in_line = -1;
	used_in_line = [];
	idx = -1; // number assigned, depending on the chosen ordering of the rules
	
	constructor(name) {
		super();
		this.name = name;
	}
	
	format(html, with_idx) {
		if( html ){
			if( with_idx ){
				return "<i>" + this.name + "</i><sub>" + (this.idx < 0? "?" : this.idx) + "</sub>";
			} else {
				return "<i>" + this.name + "</i>";
			}
		} else {
			if( with_idx ){
				return this.name + "_" +  (this.idx < 0? "?" : this.idx);
			} else {
				return this.name;
			}
		}
	}
}

/**
 * String literal "abc".
 */
class LiteralNode extends Node {
	
	s = null; // raw content of the literal without double-quotes and escaping
	
	constructor(s) {
		super();
		this.s = s;
	}
	
	format(html, with_idx) {
		var s = "\"";
		for(var i = 0; i < this.s.length; i++){
			var c    = this.s[i];
			var code = this.s.charCodeAt(i);
			if( 32 <= code && code <= 126 && c !== "\\" && c !== "\"" ){
				s += c;
			} else {
				if( c === "\\" )
					s += "\\\\";
				else if( c === "\"" )
					s += "\\\"";
				else if( c === "\u0007" )
					s += "\\a";
				else if( c === "\b" )
					s += "\\b";
				else if( c === "\n" )
					s += "\\n";
				else if( c === "\r" )
					s += "\\r";
				else if( c === "\t" )
					s += "\\t";
				else if( code <= 255 ){
					var HEX = "0123456789abcdef";
					s += "\\x" + HEX[code >> 4] + HEX[code & 15];
				} else {
					var HEX = "0123456789abcdef";
					s += "\\u" + HEX[(code >> 12) & 15] + HEX[(code >> 8) & 15]
						+ HEX[(code >> 4) & 15] + HEX[code & 15];
				}
			}
		}
		if( html )
			s = "<code><b>" + htmlescape(s) + "\"</b></code>";
		else
			s = s + "\"";
		return s;
	}
}

/**
 * Optional node [EXPR].
 */
class OptionalNode extends Node {
	
	expr = null; // Node
	
	constructor(expr) {
		super();
		this.expr = expr;
	}
	
	format(html, with_idx) {
		return "[ " + this.expr.format(html, with_idx) + " ]";
	}
}

/**
 * Repetiton node {EXPR}.
 */
class MultipleNode extends Node {
	
	expr = null; // Node
	
	constructor(expr) {
		super();
		this.expr = expr;
	}
	
	format(html, with_idx) {
		return "{ " + this.expr.format(html, with_idx) + " }";
	}
}

/**
 * Characters range node "a".."z".
 */
class RangeNode extends Node {
	
	a = null; // LiteralNode
	b = null; // LiteralNode
	
	constructor(literal_a, literal_b) {
		super();
		this.a = literal_a;
		this.b = literal_b;
	}
	
	format(html, with_idx) {
		return this.a.format(html, with_idx) + ".." + this.b.format(html, with_idx);
	}
}

/**
 * Sequence of 2+ nodes A B C.
 */
class AndNode extends Node {
	
	nodes = [];  // Node[]
	
	constructor(first_node) {
		super();
		this.nodes[0] = first_node;
	}
	
	add(node) {
		this.nodes.push(node);
	}
	
	format(html, with_idx) {
		var s = "";
		for(var i = 0; i < this.nodes.length; i++){
			if( i > 0 )
				s += " ";
			var node = this.nodes[i];
			if( node instanceof OrNode )
				s += "( " + node.format(html, with_idx) + " )";
			else
				s += node.format(html, with_idx);
		}
		return s;
	}
}

/**
 * Alternative 2+ nodes A|B|C.
 */
class OrNode extends Node {
	
	nodes = [];  // Node[]
	
	constructor(first_node) {
		super();
		this.nodes[0] = first_node;
	}
	
	add(node) {
		this.nodes.push(node);
	}
	
	format(html, with_idx) {
		var s = this.nodes[0].format(html, with_idx);
		for(var i = 1; i < this.nodes.length; i++){
			s += " | " + this.nodes[i].format(html, with_idx);
		}
		return s;
	}
}

/**
 * Source scanner that returns symbols.
 */
class Scanner {
	
	// Symbols:
	END() { return "end of the text"; }
	NAME() { return "identifier"; }
	LITERAL() { return "literal string"; }
	SQUARE_OPEN() { return "["; }
	SQUARE_CLOSE() { return "]"; }
	CURLY_OPEN() { return "{"; }
	CURLY_CLOSE() { return "}"; }
	PAREN_OPEN() { return "("; }
	PAREN_CLOSE() { return ")"; }
	PIPE() { return "|"; }
	EQUAL() { return "="; }
	ELLIPSIS() { return ".."; }
	SEMICOLON() { return ";"; }
	
	report = ""; // collects error and diagnostic messages
	src = ""; // source to scan
	line_no = -1; // current line no., first line is 1
	idx = 0;  // index to next char
	c = "?";  // current char
	sym = null; // current symbol
	
	constructor(src) {
		this.src = src;
		this.line_no = 1;
		this.col_no = 1;
		this.idx = 0;
		this.c = "?";
		this.nextChar();
		this.nextSym();
	}
	
	
	in_line(n) {
		if( this.line_no > 0 )
			return " <a href='#' onclick='go_to_line(" + n + ");'>in line " + n + "</a>";
		else
			return "";
	}
	
	
	fatal(msg) {
		this.report += "FATAL" + this.in_line(this.line_no) + ": " + htmlescape(msg) + "\n";
		throw new Error("Parsing incomplete due to fatal error.");
	}
	
	
	error(msg) {
		this.report += "ERROR" + this.in_line(this.line_no) + ": " + htmlescape(msg) + "\n";
	}
	
	
	warning(msg) {
		this.report += "Warning" + this.in_line(this.line_no) + ": " + htmlescape(msg) + "\n";
	}
	
	
	nextChar() {
		if( this.c === "\n" )
			this.line_no++;
		if( this.idx >= this.src.length ){
			this.c = "\0";
		} else {
			this.c = this.src[this.idx++];
		}
	}
	
	isSpace(c) {
		return c === " " || c === "\t" || c === "\r" || c === "\n";
	}
	
	isLetter(c) {
		return "a" <= c && c <= "z" || "A" <= c && c <= "Z";
	}
	
	isDigit(c) {
		return "0" <= c && c <= "9";
	}
	
	decodeHex(c) {
		if( this.c.length !== 1 )
			return -1;
		if( "0" <= c && c <= "9" )
			return c.charCodeAt(0) - "0".charCodeAt(0);
		else if( "a" <= c && c <= "f" )
			return c.charCodeAt(0) - "a".charCodeAt(0) + 10;
		else if( "A" <= c && c <= "F" )
			return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
		else
			return -1;
	}
	
	nextSym() {
		// Skip spaces and comments:
		do {
			if( this.c === "\0" ){
				this.sym = this.END();
				return;
			}
			else if( this.isSpace(this.c) ){
				this.nextChar();
			}
			else if( this.c === "#" ){
				do {
					this.nextChar();
					if( this.c === "\n" ){
						this.nextChar();
						break;
					}
					if( this.c === "\0" ){
						break;
					}
				} while(true);
			}
			else
				break;
		} while(true);
		
		if( this.isLetter(this.c) || this.c === "_" ){
			this.sym = this.NAME();
			this.s = this.c;
			this.nextChar();
			while( this.isLetter(this.c) || this.isDigit(this.c) || this.c === "_" ){
				this.s = this.s + this.c;
				this.nextChar();
				if( this.c === "-" ){
					this.error("hyphen in identifiers not supported, use underscore instead");
					this.c = "_";
				}
			}
			return;
		}
		
		if( this.c === "\"" ){
			this.sym = this.LITERAL();
			this.s = "";
			do {
				this.nextChar();
				if( this.c === "\"" ){
					this.nextChar();
					break;
				} else if( this.c === "\\" ){
					// FIXME: detects non-ASCII and invisible spaces and ctrls
					this.nextChar();
					if( this.c === "\\" ){
						;
					} else if( this.c === "\"" ){
						;
					} else if( this.c === "a" ){
						this.c = "\u0007";
					} else if( this.c === "b" ){
						this.c = "\b";
					} else if( this.c === "n" ){
						this.c = "\n";
					} else if( this.c === "r" ){
						this.c = "\r";
					} else if( this.c === "t" ){
						this.c = "\t";
					} else if( this.c === "x" ){
						var code = 0;
						for(var i = 0; i < 2; i++){
							this.nextChar();
							var digit = this.decodeHex(this.c);
							if( digit < 0 ){
								this.error("not an hex digit: " + this.c);
								break;
							} else {
								code = 16*code + digit;
							}
						}
						this.c = String.fromCodePoint(code);
					} else if( this.c === "u" ){
						var code = 0;
						for(var i = 0; i < 4; i++){
							this.nextChar();
							var digit = this.decodeHex(this.c);
							if( digit < 0 ){
								this.error("not an hex digit: " + this.c);
								break;
							} else {
								code = 16*code + digit;
							}
						}
						this.c = String.fromCodePoint(code);
					} else {
						this.error("invalid escape sequence \\" + this.c);
						this.c = "?";
					}
				} else if( this.c === "\r" || this.c === "\n" ){
					this.fatal("unclosed literal string");
				} else if( this.c.charCodeAt(0) < 32 || this.c.charCodeAt(0) === 127 ){
					this.error("control code in literal string: " + this.c.charCodeAt(0));
				}
				this.s = this.s + this.c;
			} while(true);
			if( this.s.length === 0 )
				this.error("empty literal string");
			return;
		}
		
		if( this.c === "." ){
			this.sym = this.ELLIPSIS();
			this.nextChar();
			if( this.c !== "." )
				this.fatal("incomplete ellipsis '..' symbol");
			this.nextChar();
			return;
		}
		
		if( this.c === "[" ){
			this.sym = this.SQUARE_OPEN();
			this.nextChar();
			return;
		}
		
		if( this.c === "]" ){
			this.sym = this.SQUARE_CLOSE();
			this.nextChar();
			return;
		}
		
		if( this.c === "{" ){
			this.sym = this.CURLY_OPEN();
			this.nextChar();
			return;
		}
		
		if( this.c === "}" ){
			this.sym = this.CURLY_CLOSE();
			this.nextChar();
			return;
		}
		
		if( this.c === "(" ){
			this.sym = this.PAREN_OPEN();
			this.nextChar();
			return;
		}
		
		if( this.c === ")" ){
			this.sym = this.PAREN_CLOSE();
			this.nextChar();
			return;
		}
		
		if( this.c === "=" ){
			this.sym = this.EQUAL();
			this.nextChar();
			return;
		}
		
		if( this.c === "|" ){
			this.sym = this.PIPE();
			this.nextChar();
			return;
		}
		
		if( this.c === ";" ){
			this.sym = this.SEMICOLON();
			this.nextChar();
			return;
		}
		
		// gracefully handle "<ID>":
		if( this.c === "<" ){
			this.error("angular brackets for identifiers '<' not required");
			this.nextChar();
			this.nextSym();
			return;
		}
		
		// gracefully handle "<ID>":
		if( this.c === ">" ){
			this.error("angular brackets for identifiers '>' not required");
			this.nextChar();
			this.nextSym();
			return;
		}
		
		// gracefully handle single-quoted strings:
		if( this.c === "'" ){
			this.error("literal strings require double-quotes '\"'");
			this.sym = this.LITERAL();
			this.s = "";
			this.nextChar();
			while( this.c !== "\0" && this.c !== "'" ){
				this.s += this.c;
				this.nextChar();
			}
			this.nextChar();
			return;
		}
		
		this.error("ignoring unexpected character '" + this.c + "'");
		this.nextChar();
		this.nextSym();
	}
	
}

/**
 * Parse BNF rules. The constructor does the parsing; the inherited "report"
 * property contains the diagnostic messages.
 * Finally, the format() method returns the BNF formatted according to the arguments.
 */
class Parser extends Scanner {
	
	rules = []; // parsed rules RuleNode[]
	
	/**
	 * Parses the rules defined in the source text.
	 * @param {string} src  BNF source to parse.
	 */
	constructor(src) {
		super(src);
		try {
			while( this.sym !== this.END() ){
				this.parseRule();
			}
			this.line_no = -1; // stop reporting "in line N"
		}
		catch(error) {
			this.report+= error.message;
			return;
		}
		
		for(var i = 0; i < this.rules.length; i++){
			var rule = this.rules[i];
			if( rule.defined_in_line < 0 )
				this.warning("rule '" + rule.name + "' NOT DEFINED, used " + rule.used_in_line.length + " times");
			if( rule.used_in_line.length === 0 )
				this.warning("rule '" + rule.name + "' defined in line " + rule.defined_in_line + ", NEVER USED");
		}
	}
	
	findRule(name) {
		for(var i = 0; i < this.rules.length; i++)
			if( this.rules[i].name === name )
				return this.rules[i];
		return null;
	}
	
	parseRule() {
		if( this.sym !== this.NAME() )
			this.fatal("expected rule name but found: " + this.sym);
		var rule = this.findRule(this.s);
		if( rule === null ){
			rule = new RuleNode(this.s);
			rule.defined_in_line = this.line_no;
			this.rules.push(rule);
		} else if( rule.defined_in_line > 0 ){
			this.error("rule '" + rule.name + "' already defined in line " + rule.defined_in_line);
		} else {
			rule.defined_in_line = this.line_no;
		}
		this.nextSym();
		
		if( this.sym !== this.EQUAL() )
			this.fatal("expected '=' but found: " + this.sym);
		this.nextSym();
		
		rule.expr = this.parseExpr();
		
		if( this.sym !== this.SEMICOLON() )
			this.fatal("expected ';' but found: " + this.sym);
		this.nextSym();
	}
	
	parseExpr() {
		var expr = this.parseTerm();
		if( this.sym === this.PIPE() ){
			expr = new OrNode(expr);
			do {
				this.nextSym();
				expr.add( this.parseTerm() );
			} while( this.sym === this.PIPE() );
		}
		return expr;
	}
	
	/**
	 * Returns the length of the string as number of Unicode Codepoints.
	 * Note that strings in JavaScript are encoded as UTF-16 units, so some
	 * Codepoints may require two UTF-16 units.
	 * Example: "a\uD87E\uDC04z" is 4 UTF-16 units long but only 3 Codepoints long.
	 * Implemented by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
	 * @param {string} str
	 * @returns {int} Number of Codepoints.
	 */
	getNumberOfCodepoints(s) {
		// The string iterator that is used here iterates over characters,
		// not mere code units
		return [...s].length;
	}
	
	parseTerm() {
		var f = this.parseFactor();
		if( f === null )
			this.fatal("invalid expression");
		var f2 = this.parseFactor();
		if( f2 !== null ){
			f = new AndNode(f);
			f.add(f2);
			while( (f2 = this.parseFactor()) !== null ){
				f.add(f2);
			}
		}
		return f;
	}
	
	parseFactor() {
		if( this.sym === this.NAME() ){
			var rule = this.findRule(this.s);
			if( rule === null ){
				rule = new RuleNode(this.s);
				this.rules.push(rule);
			}
			rule.used_in_line.push(this.line_no);
			this.nextSym();
			return rule;
		}
		
		if( this.sym === this.LITERAL() ){
			var expr = new LiteralNode(this.s);
			this.nextSym();
			if( this.sym === this.ELLIPSIS() ){
				this.nextSym();
				if( this.sym !== this.LITERAL() )
					this.fatal("expected literal string after ellipsis");
				var b = new LiteralNode(this.s);
				if( !(this.getNumberOfCodepoints(expr.s) === 1 && this.getNumberOfCodepoints(b.s) === 1) )
					this.error("strings in range must be exactly 1 character long each");
				else if( !(expr.s < b.s) )
					this.error("strings in range are in reverse order");
				expr = new RangeNode(expr, b);
				this.nextSym();
			}
			return expr;
		}
		
		if( this.sym === this.PAREN_OPEN() ){
			this.nextSym();
			var expr = this.parseExpr();
			if( this.sym !== this.PAREN_CLOSE() )
				this.fatal("expected ')' but found: " + this.sym);
			this.nextSym();
			return expr;
		}
		
		if( this.sym === this.SQUARE_OPEN() ){
			this.nextSym();
			var expr = this.parseExpr();
			if( this.sym !== this.SQUARE_CLOSE() )
				this.fatal("expected ']' but found: " + this.sym);
			this.nextSym();
			return new OptionalNode(expr);
		}
		
		if( this.sym === this.CURLY_OPEN() ){
			this.nextSym();
			var expr = this.parseExpr();
			if( this.sym !== this.CURLY_CLOSE() )
				this.fatal("expected '}' but found: " + this.sym);
			this.nextSym();
			return new MultipleNode(expr);
		}
		
		return null;
	}
	
	/**
	 * Returns the parsed BNF formatted according to the arguments.
	 * @param {bool} sort  If true rules are sorted by their name, otherwise keeps ordering.
	 * @param {bool} html  Returns HTML if true, text if false.
	 * @param {bool} with_idx  Append the assigned index to each used rule.
	 * @returns {string}  Formatted BNF.
	 */
	format(sort, html, with_idx) {
		if( sort ){
			// alphabetical sorting:
			this.rules.sort((a, b) => {
				if( a.name < b.name )
					return -1;
				else if( a.name > b.name )
					return +1;
				else
					return 0;
			});
		} else {
			// sort in order of definition:
			this.rules.sort((a, b) => {
				return a.defined_in_line - b.defined_in_line;
			});
		}
		
		// Enumerating the rules, but skip the undefined ones:
		if( with_idx ){
			var n = 1;
			for(var i = 0; i < this.rules.length; i++){
				if( this.rules[i].defined_in_line > 0 )
					this.rules[i].idx = n++;
			}
		}
		
		// Generate list of defined rules:
		var s = "";
		for(var i = 0; i < this.rules.length; i++){
			var rule = this.rules[i];
			if( rule.defined_in_line < 0 )
				continue;
			if( with_idx )
				s += rule.idx + ". ";
			s += rule.name + " = "
				+ (rule.expr === null? "?" : rule.expr.format(html, with_idx));
			if( html )
				s += " ;<br/>\r\n";
			else
				s += " ;\r\n";
		}
		
		return s;
	}
	
}

