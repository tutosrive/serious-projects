# Usa una imagen oficial de Java
FROM openjdk:21-jdk

# Copia el archivo JAR en el contenedor
COPY randomNames.jar /app/randomNames.jar

# Define el directorio de trabajo
WORKDIR /app

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "randomNames.jar"]