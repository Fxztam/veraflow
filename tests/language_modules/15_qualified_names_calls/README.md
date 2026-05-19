# 15_qualified_names_calls

Qualified names are accepted in function-call expressions and `call` statements.

This module covers current-module-qualified routine calls, qualified built-ins, nested calls, and the distinction between procedure calls and function-call expressions. Current-module-qualified local names are normalized to the declared local routine; foreign qualified routine references remain unknown unless handled by a built-in namespace.

Initial diagnostics:

```text
VF-U005 unknown routine
VF-U006 call requires procedure
VF-U007 wrong routine argument count
VF-U008 routine argument type mismatch
VF-U010 function call requires function
```
