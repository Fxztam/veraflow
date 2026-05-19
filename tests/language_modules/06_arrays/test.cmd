@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 06_arrays %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%