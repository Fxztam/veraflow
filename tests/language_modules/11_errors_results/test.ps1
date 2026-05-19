$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Push-Location $ProjectRoot
try {
    python -m veraflow test-language --module 11_errors_results @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}