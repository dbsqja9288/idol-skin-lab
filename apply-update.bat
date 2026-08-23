@echo off
chcp 65001 >nul
cd /d "%~dp0"
REM 워크플로 파일은 보안상 원격으로 직접 못 써서, 이 스크립트가 로컬에서 복사한다.
copy /Y "_update\social.yml" ".github\workflows\social.yml" >nul
if errorlevel 1 (
  echo [!] 복사 실패 - _update\social.yml 이 있는지 확인하세요.
  pause
  exit /b 1
)
echo [OK] 워크플로 갱신 완료. 이제 push 합니다...
call push.bat
