# 09_statements

Statements are tested after routines so each statement can live inside a stable procedure or function frame.

This section covers `let`, assignment, field assignment, `check`, `if`, `while`, `case`, `return`, and `call`. Case coverage is explicit: valid case dispatch, branch type mismatch, and duplicate branch values.

Initial diagnostics:

```text
VF-ST001 unknown assignment target
VF-ST002 assignment type mismatch
VF-ST003 statement Boolean requirement
VF-ST004 while variant must be Integer
VF-ST005 case branch type mismatch
VF-ST006 duplicate case branch value
VF-ST007 let declaration uses assignment operator
```
