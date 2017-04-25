#REM Batch Clean Adap Counter Measures

START /D D:\Github\adap\jhipster-registry call  mvnw clean
timeout /t 5 
START /D D:\Github\adap\adap_gateway call mvn clean
timeout /t 5 
START /D D:\Github\adap\adap_core call mvnw clean
timeout /t 5 
START /D D:\Github\adap\adap_risk call mvnw clean
#timeout /t 5 
#START /D D:\Github\adap\adap_report 