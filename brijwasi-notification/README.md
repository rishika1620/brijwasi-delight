BRIJWASI Notification Service

Setup:
1. Create PostgreSQL database `notification_db` locally and set credentials in `application.yml`.
2. Start Kafka on localhost:9092.
3. Start Eureka then run this service.

Run:
   mvn clean package
   mvn spring-boot:run
