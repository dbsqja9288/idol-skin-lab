@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo   Idol Skin Lab - first-time setup
echo ==========================================
echo.
echo   Node.js is NOT needed. Vercel builds on its
echo   own servers. This script only needs git.
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [!] git is not installed.
  echo     Install it from https://git-scm.com then run this again.
  echo.
  pause
  exit /b 1
)

echo [1/3] creating the local repository
if not exist ".git" (
  git init
  git branch -M main
)
git add -A
git commit -m "init: Idol Skin Lab"
if errorlevel 1 echo   (nothing new to commit - continuing)
echo.

echo [2/3] creating the GitHub repository
where gh >nul 2>&1
if errorlevel 1 goto MANUAL
gh repo create idol-skin-lab --public --source=. --push
if errorlevel 1 goto MANUAL
goto DEPLOY

:MANUAL
echo.
echo   gh CLI not found (or the repo already exists).
echo   Create it by hand - takes about a minute:
echo.
echo     1. Open https://github.com/new
echo     2. Repository name: idol-skin-lab
echo        Public. Do NOT add a README or .gitignore.
echo     3. Copy your username, then run these two lines here:
echo.
echo        git remote add origin https://github.com/YOURNAME/idol-skin-lab.git
echo        git push -u origin main
echo.

:DEPLOY
echo [3/3] next step - deploy
echo.
echo   Open https://vercel.com/new
echo   Import the idol-skin-lab repository.
echo   Framework will be detected as Next.js - just press Deploy.
echo.
echo   After that, double-click push.bat to publish any change.
echo.
echo ==========================================
echo   DONE
echo ==========================================
pause
