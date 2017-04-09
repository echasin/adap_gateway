#REM Batch Deploy Adap Counter Measures

START /D c:\Github\jhipster-registry call mvnw -Dmaven.test.skip=true
timeout /t 15 

START /D c:\Github\adap_gateway call mvnw -Dmaven.test.skip=true
timeout /t 15 

START /D c:\Github\adap_core call mvnw -Dmaven.test.skip=true
timeout /t 15 

START /D c:\Github\adap_risk call mvnw -Dmaven.test.skip=true
#timeout /t 5 

#START /D c:\Github\adap_report 