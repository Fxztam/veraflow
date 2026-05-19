$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Push-Location $ProjectRoot
try {
    python -m veraflow test-language --module 12_type_conflicts @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}