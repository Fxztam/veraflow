@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 18_string_templates %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%