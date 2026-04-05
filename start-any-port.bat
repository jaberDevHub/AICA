@echo off
echo Starting AICA AI on any available port...
echo.

REM Try different ports if default is taken
set PORT=3000
:try_port
echo Trying port %PORT%...
vercel dev --listen %PORT% >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Server started successfully on port %PORT%
    echo Open your browser to: http://localhost:%PORT%
    goto :end
)

REM Port is taken, try next
set /a PORT+=1
if %PORT% GTR 3010 (
    echo Could not find available port between 3000-3010
    goto :error
)
goto :try_port

:error
echo Failed to start server
pause
exit /b 1

:end
echo Server is running...
pause
