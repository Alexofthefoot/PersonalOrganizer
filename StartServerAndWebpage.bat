@echo off
cd /d "C:\Users\16043\COSCpersonalProjects\habitTracker"  
start cmd /k "node app.js"  
timeout 2 
start http://localhost:3000  