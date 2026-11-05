# ===========================
#  Stage 1: Build
# ===========================
FROM node:20-slim AS builder
WORKDIR /app

# Variables de entorno para builds reproducibles
#ENV NODE_ENV=production

# Copiamos dependencias primero (cache más eficiente)
COPY package*.json ./

RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Ejecutamos build de Vite
RUN npm run build

# ===========================
#  Stage 2: Runtime (Nginx)
# ===========================
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Limpiamos contenido por defecto
RUN rm -rf ./*

# Copiamos el build desde la etapa anterior
COPY --from=builder /app/dist ./

# Copiamos configuración de nginx si existe
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

