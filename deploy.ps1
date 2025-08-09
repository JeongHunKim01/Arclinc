Write-Host "🚀 Deploying to GitHub and Vercel..." -ForegroundColor Green

# Git 명령어 실행
& "C:\Program Files\Git\bin\git.exe" add .
& "C:\Program Files\Git\bin\git.exe" commit -m "Auto update - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
& "C:\Program Files\Git\bin\git.exe" push

Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host "📝 Check Vercel dashboard for updates (usually takes 1-2 minutes)" -ForegroundColor Yellow
Write-Host "🌐 Your site will be updated at: https://arclinc.com" -ForegroundColor Cyan

Read-Host "Press Enter to continue..."


