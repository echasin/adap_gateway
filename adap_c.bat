#REM Batch Deploy Adap Counter Measures
START /D c:\Github\jhipster-registry-25 call mvnw -DskipTests spring-boot:run
timeout /t 5 
START /D c:\Github\adap_gateway call mvnw -DskipTests spring-boot:run
timeout /t 5 
START /D c:\Github\adap_core call mvnw -DskipTests spring-boot:run
timeout /t 5 
START /D c:\Github\adap_risk call mvnw -DskipTests spring-boot:run
#timeout /t 5 
#START /D c:\Github\adap_report 