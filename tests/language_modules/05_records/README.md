# 05_records

Record declaration, literal, field access, and field assignment diagnostics live here.

This section follows scalar type aliases/ranges in `04_types`. It keeps record-specific
shape errors separate from general type-name and keyword-name rules.

Initial diagnostics:

```text
VF-R001 duplicate record field
VF-R002 unknown record type
VF-R003 duplicate record literal field
VF-R004 unknown record literal field
VF-R005 missing record literal field
VF-R006 field access requires record
VF-R007 unknown record field
VF-R008 unknown record variable
VF-N002 reserved keyword cannot be used as name
VF-T003 unknown type reference
```