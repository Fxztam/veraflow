# 08_routines

Procedures and functions are tested together because they share the same top-level routine frame: names, parameters, body delimiters, calls, and return rules.

This section intentionally includes function returns for `Integer`, `Double`, `Boolean`, `String`, record, and `Array<T, N>` values.

Initial diagnostics:

```text
VF-N001 duplicate top-level declaration name
VF-N002 reserved keyword cannot be used as name
VF-T003 unknown type reference
VF-U001 function/procedure end name mismatch
VF-U002 duplicate parameter name
VF-U003 function has no guaranteed return
VF-U004 procedure cannot return a value
VF-U005 unknown routine
VF-U006 call requires procedure
VF-U007 wrong routine argument count
VF-U008 routine argument type mismatch
VF-U009 function return type mismatch
```
