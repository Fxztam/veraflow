$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Push-Location $ProjectRoot
try {
    python -m veraflow test-language --module 07_string @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}