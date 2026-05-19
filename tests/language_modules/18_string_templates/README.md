# 18_string_templates

String templates use `${}` placeholders in ordinary String literals.

First stage:

```text
String.template("id=${}", id) -> String
Std.IO.logf("id=${}", id) -> output
```

Rules:

```text
`${}` and `${ }` are positional placeholders.
Each placeholder requires exactly one following value.
Template values may be String, Integer, Boolean, or Double.
The old `{}` placeholder form is rejected.
```

TODO:

```text
Named templates: `${name}` should bind to in-scope values in a later expansion.
```
