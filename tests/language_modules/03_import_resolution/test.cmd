@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 03_import_resolution %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%