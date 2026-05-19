# 06_arrays

Array type, literal, and index diagnostics live here.

This section follows records because arrays are expression-level container types:
they use `Array<T, N>` return/let types, `[ ... ]` literals, and `xs[i]` access.

Initial diagnostics:

```text
VF-A001 array literal elements must be scalar
VF-A002 array literal has mixed element types
VF-A003 array length mismatch
VF-A004 array element type mismatch
VF-A005 unknown array
VF-A006 index access requires Array
VF-A007 array index must be Integer
VF-A008 array index out of bounds
VF-T003 unknown type reference
```