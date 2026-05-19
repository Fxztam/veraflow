# 12_type_conflicts

This module collects cross-cutting conflicts that belong to more than one language area.

It covers top-level declaration name collisions, assignment mismatches through aliases, exact record assignment, deep Array assignment compatibility, deep Result assignment compatibility, routine argument mismatches, and return type mismatches.

Expected diagnostic families:

```text
VF-N001 duplicate top-level declaration name
VF-T001 duplicate type declaration
VF-ST002 assignment type mismatch
VF-U008 routine argument type mismatch
VF-U009 function return type mismatch
```
