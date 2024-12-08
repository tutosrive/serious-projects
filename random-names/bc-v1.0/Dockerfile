# Dockerfile.koyeb
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY randomNames.jar .
EXPOSE 7070
CMD ["java", "-jar", "./randomNames.jar"]
