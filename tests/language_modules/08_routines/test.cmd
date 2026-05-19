@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 08_routines %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%