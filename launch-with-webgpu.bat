@echo off
title NasInfinity AI - WebGPU Hardware Accelerator Launcher
echo ====================================================================
echo   NasInfinity AI - No-GPU / Intel HD Graphics WebGPU Launcher
echo ====================================================================
echo.
echo Launching browser with --enable-unsafe-webgpu to unlock WebGPU...
echo.

if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --enable-unsafe-webgpu http://localhost:3000
    goto done
)

if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files\Microsoft\Edge\Application\msedge.exe" --enable-unsafe-webgpu http://localhost:3000
    goto done
)

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --enable-unsafe-webgpu http://localhost:3000
    goto done
)

start "" msedge.exe --enable-unsafe-webgpu http://localhost:3000

:done
echo Browser opened! Opening http://localhost:3000
timeout /t 3 >nul
exit
