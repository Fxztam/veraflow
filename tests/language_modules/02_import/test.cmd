@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 02_import %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%