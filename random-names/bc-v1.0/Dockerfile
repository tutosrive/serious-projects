# Imagen base de Java
FROM openjdk:21-jdk-slim

# Directorio de trabajo
WORKDIR /app

# Copia el archivo JAR al contenedor
COPY target/envios.jar /app/envios.jar

# Puerto expuesto (Railway usará la variable PORT)
EXPOSE 7070

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "java -jar /app/envios.jar --server.port=${PORT:-7070}"]
