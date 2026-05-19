$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Push-Location $ProjectRoot
try {
    python -m veraflow test-language --module 15_qualified_names_calls @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}