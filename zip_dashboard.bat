@echo off
setlocal enabledelayedexpansion

:: Set root path for your project directories
set "FRONTEND=C:\Users\oracle.admin\source\repos\stere8\OnlineShop\OnlineShop\oshi\dashboard-frontend"
set "BACKEND=C:\Users\oracle.admin\source\repos\stere8\OnlineShop\OnlineShop\oshi\dashboardapi"
set "OUT=C:\Users\oracle.admin\source\repos\stere8\OnlineShop\OnlineShop\oshi\archives"

:: Create output directory if it doesn't exist
if not exist "%OUT%" mkdir "%OUT%"

:: Temporary directories for frontend and backend
set "TEMP=%TEMP%\dashboard_zip"
rd /s /q "%TEMP%" 2>nul
mkdir "%TEMP%\frontend"
mkdir "%TEMP%\backend"

:: Copy frontend excluding unnecessary files
xcopy "%FRONTEND%" "%TEMP%\frontend" /E /I /Y /EXCLUDE:exclude_frontend.txt

:: Copy backend excluding unnecessary files
xcopy "%BACKEND%" "%TEMP%\backend" /E /I /Y /EXCLUDE:exclude_backend.txt

:: Create the zip archives
powershell -Command "Compress-Archive -Path '%TEMP%\frontend\*' -DestinationPath '%OUT%\dashboard-frontend.zip' -Force"
powershell -Command "Compress-Archive -Path '%TEMP%\backend\*' -DestinationPath '%OUT%\dashboardapi.zip' -Force"

:: Notify the user
echo.
echo ✅ Archives have been created in %OUT%
pause