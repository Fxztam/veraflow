$env:PYTHONPATH = "$PSScriptRoot;$env:PYTHONPATH"
python -m veraflow run @args
exit $LASTEXITCODE