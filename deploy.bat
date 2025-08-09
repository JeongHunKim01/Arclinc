@echo off
echo Deploying to GitHub and Vercel...
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Auto update - %date% %time%"
"C:\Program Files\Git\bin\git.exe" push
echo Deployment completed! Check Vercel for updates.
pause


