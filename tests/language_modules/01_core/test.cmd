@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 01_core %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%