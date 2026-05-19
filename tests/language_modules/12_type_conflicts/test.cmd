@echo off
pushd "%~dp0..\..\.." >nul
python -m veraflow test-language --module 12_type_conflicts %*
set EXITCODE=%ERRORLEVEL%
popd >nul
exit /b %EXITCODE%