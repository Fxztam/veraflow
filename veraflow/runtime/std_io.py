from __future__ import annotations

def log(value) -> None:
    print(value)

def logf(template: str, *values) -> None:
    out = template
    for value in values:
        out = out.replace("{}", str(value), 1)
    print(out)
