# 19_big_numbers

The Big standard module is a top-level trusted runtime module for arbitrary-precision numbers, parallel to `Math` but intentionally separate from Double-based math.

The public call shape is qualified: `Big.int(text)`, `Big.addInt(left, right)`, `Big.float(text, precisionBits)`, `Big.sqrt(value)`, and related helpers. Big calls are expressions, not `call` statements.

Initial types:

```text
BigInteger arbitrary-precision integer
BigFloat arbitrary-precision floating point with explicit precision
```

Initial operations:

```text
Big.int(text) -> BigInteger
Big.fromInteger(value) -> BigInteger
Big.float(text, precisionBits) -> BigFloat
Big.floatFromInteger(value, precisionBits) -> BigFloat
Big.addInt(left, right) -> BigInteger
Big.subInt(left, right) -> BigInteger
Big.mulInt(left, right) -> BigInteger
Big.divInt(left, right) -> BigInteger
Big.negInt(value) -> BigInteger
Big.absInt(value) -> BigInteger
Big.signInt(value) -> Integer
Big.addFloat(left, right) -> BigFloat
Big.subFloat(left, right) -> BigFloat
Big.mulFloat(left, right) -> BigFloat
Big.divFloat(left, right) -> BigFloat
Big.sqrt(value) -> BigFloat
Big.absFloat(value) -> BigFloat
Big.signFloat(value) -> Integer
Big.toString(value) -> String
Big.format(value, digits) -> String
```

Initial diagnostics:

```text
VF-BI001 wrong Big argument count
VF-BI002 Big argument type mismatch
```

TODO:

```text
Consider qualified type syntax such as Big.Integer and Big.Float after the type grammar supports qualified type names.
```
