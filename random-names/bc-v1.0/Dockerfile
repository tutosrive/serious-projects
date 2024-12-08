# Usar una imagen base de Java
FROM openjdk:21-jdk-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo JAR a la imagen
COPY randomNames.jar /app/randomNames.jar

# Exponer el puerto (ajústalo según tu configuración)
EXPOSE 8080

# Comando para ejecutar el JAR
ENTRYPOINT ["java", "-jar", "randomNames.jar"]
