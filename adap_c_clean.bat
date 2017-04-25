#REM Batch Deploy Adap Counter Measures

START /D c:\Github\jhipster-registry call mvnw clean
timeout /t 45 
START /D c:\Github\adap_gateway call mvnw clean
timeout /t 45 
START /D c:\Github\adap_core call mvnw clean
timeout /t 45 
START /D c:\Github\adap_risk call mvnw clean
timeout /t 45 

#START /D c:\Github\adap_report 