# 16_control_flow_edges

This module covers edge cases around `if`, `while`, and `case` control flow.

It focuses on guaranteed-return analysis, branch-local scopes, optional `variant` clauses, multiple loop invariants, and required syntactic control-flow markers such as `while` invariants and `case` defaults.

Root behavior covered here:

```text
case branches use isolated local scopes
case statements guarantee function return only when every branch and default returns
while bodies do not leak local variables after the loop
if bodies do not leak local variables after the conditional
```
