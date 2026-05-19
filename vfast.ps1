$env:PYTHONPATH = "$PSScriptRoot;$env:PYTHONPATH"
python -m veraflow ast @args
exit $LASTEXITCODE