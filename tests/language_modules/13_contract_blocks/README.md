# 13_contract_blocks

Routine contract blocks contain zero or more `requires` clauses followed by zero or more `ensures` clauses before `is`.

This module covers function and procedure contracts, multiple clauses, scalar `result` postconditions, record result field postconditions, and Result-returning postconditions with `success`, `failure`, `value`, and `error`.

Loop `invariant` and `variant` clauses are contract-like, but they remain covered by `09_statements` because they are part of `while` statement syntax.

Initial diagnostics:

```text
VF-CT001 requires/ensures clause requires Boolean
VF-CT002 Result contract expression outside Result ensures
VF-E001 unknown variable
VF-E002 comparison type mismatch
```
