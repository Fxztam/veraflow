$env:PYTHONPATH = "$PSScriptRoot;$env:PYTHONPATH"
python -m veraflow verify @args
exit $LASTEXITCODE