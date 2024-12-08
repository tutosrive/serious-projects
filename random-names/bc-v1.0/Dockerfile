# Use the official OpenJDK 21 slim image as the base
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the current directory (Dockerfile's directory)
COPY random-names/bc-v1.0/randomNames.jar .

# Expose the port your application is running on
EXPOSE 7070

# Start the application
CMD ["java", "-jar", "./randomNames.jar"]
