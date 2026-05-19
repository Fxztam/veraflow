$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Push-Location $ProjectRoot
try {
    python -m veraflow test-language --module 16_control_flow_edges @args
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}