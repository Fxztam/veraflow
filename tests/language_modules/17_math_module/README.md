# 17_math_module

The Math standard module is a top-level trusted runtime module, parallel to `Std.IO`.

The public call shape is qualified: `Math.sin(value)`, `Math.sqrt(value)`, `Math.pow(base, exponent)`, and related numeric helpers. Math calls are expressions, not `call` statements.

Initial operations:

```text
Math.sin(value) -> Double
Math.cos(value) -> Double
Math.tan(value) -> Double
Math.sqrt(value) -> Double
Math.pow(base, exponent) -> Double
Math.abs(value) -> Integer or Double, matching the argument category
Math.min(left, right) -> Integer if both Integer, otherwise Double
Math.max(left, right) -> Integer if both Integer, otherwise Double
Math.floor(value) -> Integer
Math.ceil(value) -> Integer
```

Initial diagnostics:

```text
VF-MA001 wrong Math argument count
VF-MA002 Math argument type mismatch
```
