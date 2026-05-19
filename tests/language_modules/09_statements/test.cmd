@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 09_statements %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%