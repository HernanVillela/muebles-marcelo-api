# Dockerfile para la API de NestJS (optimizado para producción con Node.js 22)

# ---- Etapa 1: Build ----
# Usamos una imagen de Node.js con todas las herramientas de construcción.
# Actualizado a la versión 22.
FROM node:22-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor.
WORKDIR /usr/src/app

# Copiamos los archivos de dependencias. Se copian por separado para
# aprovechar el caché de Docker. Si no cambian, Docker no volverá a instalar las dependencias.
COPY package*.json ./

# Instalamos TODAS las dependencias, incluyendo las de desarrollo, necesarias para construir el proyecto.
RUN npm install

# Copiamos el resto del código fuente de la aplicación.
COPY . .

# Construimos la aplicación para producción. Esto compilará el TypeScript a JavaScript.
RUN npm run build

# Eliminamos las dependencias de desarrollo para aligerar la carpeta node_modules.
RUN npm prune --production


# ---- Etapa 2: Production ----
# Empezamos desde una imagen de Node.js limpia y ligera, solo para ejecutar.
# Actualizado a la versión 22.
FROM node:22-alpine

# Establecemos el directorio de trabajo.
WORKDIR /usr/src/app

# Copiamos las dependencias de producción que ya instalamos en la etapa anterior.
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiamos el código JavaScript ya compilado desde la etapa de 'builder'.
COPY --from=builder /usr/src/app/dist ./dist

# Exponemos el puerto 3000, que es el puerto por defecto en el que NestJS escucha.
EXPOSE 3000

# El comando que se ejecutará cuando el contenedor se inicie.
# Inicia la aplicación desde el archivo principal de JavaScript compilado.
CMD [ "node", "dist/main" ]
