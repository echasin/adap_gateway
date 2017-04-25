#REM Batch Deploy Adap Counter Measures
START /D D:\Github\adap\jhipster-registry call mvnw -DskipTests spring-boot:run
timeout /t 25 
START /D D:\Github\adap\adap_gateway call mvnw -DskipTests spring-boot:run
timeout /t 25 
START /D D:\Github\adap\adap_core call mvnw -DskipTests spring-boot:run
timeout /t 25 
START /D D:\Github\adap\adap_risk call mvnw -DskipTests spring-boot:run
#timeout /t 25 
#START /D D:\Github\adap\adap_report 