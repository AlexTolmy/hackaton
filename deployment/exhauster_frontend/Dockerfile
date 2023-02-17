# Сборка базового образа фронта
FROM node:18.14.0-alpine as build
# Глобальные переменные сборки
ARG UID=101
ARG GID=101
ARG PROXY
# Копирование кода
COPY ./components/exhauster_frontend /app
# Определение стартовой директории
WORKDIR /app
# Cборка npm
RUN npm config set strict-ssl false && npm install --ignore-optional && npm run-script build
#===================================================================
# Установка вебсервера
FROM caddy:2.3.0-alpine
# Глобальные переменные установки
ARG UID=101
ARG GID=101
ENV XDG_CONFIG_HOME=/tmp
# Создание служебного пользователя
RUN addgroup -g $UID -S caddy && \
    adduser -u $GID -S caddy -G caddy
# Копирование конфига вебсервера
COPY  --chown=caddy:caddy deployment/exhauster_frontend/Caddyfile /etc/caddy/Caddyfile
# Копирование скомпелированного npm
COPY  --chown=caddy:caddy --from=build /app/build /var/www
# Определение пользователя и строки запуска
USER $UID 
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
