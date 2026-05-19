# 10_expressions

Expressions are tested after statements so they can be embedded in stable `check`, `let`, and `return` contexts.

This section covers arithmetic precedence, parentheses, Double arithmetic, Boolean logic, ordering comparisons, unary operators, function call expressions, field access expressions, array index expressions, and targeted expression type errors.

Initial diagnostics:

```text
VF-E001 unknown variable
VF-E002 comparison type mismatch
VF-E003 Boolean operator operand mismatch
VF-E004 ordering comparison requires numeric operands
VF-E005 arithmetic requires numeric operands
VF-E006 unary not requires Boolean
VF-E007 unary negative requires numeric operand
```
