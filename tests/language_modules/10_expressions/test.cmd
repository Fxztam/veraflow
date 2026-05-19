@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 10_expressions %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%