$ProjectRoot = $PSScriptRoot
if (($env:Path -split ';') -notcontains $ProjectRoot) {
    $env:Path = "$ProjectRoot;$env:Path"
}
if (($env:PYTHONPATH -split ';') -notcontains $ProjectRoot) {
    $env:PYTHONPATH = "$ProjectRoot;$env:PYTHONPATH"
}
Write-Host "VeraFlow shortcuts enabled for this terminal: vfrun, vfverify, vfast, vftest"