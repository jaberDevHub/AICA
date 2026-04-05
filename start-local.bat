@echo off
echo Starting Local AI Chat Server...
echo.
echo Access your local chat app at:
echo http://localhost:3000/local-chat.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 3000
