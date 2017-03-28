START /D d:\Github\jhipster-registry-25 call mvn install -DskipTests spring-boot:run
timeout /t 5 
START /D d:\Github\adap_gateway call mvn install -DskipTests spring-boot:run
timeout /t 5 
START /D d:\Github\adap_core call mvn install -DskipTests spring-boot:run
timeout /t 5 
START /D d:\Github\adap_risk call mvn -Pprod install -DskipTests spring-boot:run
timeout /t 5 
#START /D d:\Github\adap_report 