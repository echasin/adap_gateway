#REM Batch Deploy Adap Counter Measures
START /D c:\Github\jhipster-registry-25 call mvn install -DskipTests spring-boot:run
timeout /t 5 
START /D c:\Github\adap_gateway call mvn install -DskipTests spring-boot:run
timeout /t 5 
START /D c:\Github\adap_core call mvn install -DskipTests spring-boot:run
timeout /t 5 
START /D c:\Github\adap_risk call mvn -Pprod install -DskipTests spring-boot:run
#timeout /t 5 
#START /D c:\Github\adap_report 
