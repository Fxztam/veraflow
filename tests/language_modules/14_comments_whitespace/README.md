# 14_comments_whitespace

Comments are lexical trivia and must not change parser, verifier, or interpreter semantics.

This module covers line comments, block comments, multiline block comments, comments between tokens, whitespace with tabs and blank lines, and comment markers inside strings. Nested block comments are explicitly rejected.

Initial diagnostics:

```text
VF-CM001 nested block comment
VF-CM002 unterminated block comment
```
