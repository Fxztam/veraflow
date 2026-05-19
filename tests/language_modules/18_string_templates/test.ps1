$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Push-Location $ProjectRoot
try {
    python -m veraflow test-language --module 18_string_templates @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}