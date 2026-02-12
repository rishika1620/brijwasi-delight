BRIJWASI Gateway

Run the gateway after Eureka is up.

Startup:

1. Ensure Eureka (port 8761) is running.
2. Build and run the gateway:

   mvn clean package
   mvn spring-boot:run

Notes:
- Gateway is reactive (spring.main.web-application-type: reactive).
- JWT secret must match the Auth service's secret.
