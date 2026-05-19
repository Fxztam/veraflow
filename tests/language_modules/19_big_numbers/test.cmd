@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 19_big_numbers %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%
