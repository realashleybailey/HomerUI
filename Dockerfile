FROM node:16.15-alpine

## Install Frontend App
WORKDIR /app

COPY ./app/package*.json ./
RUN npm install

COPY ./app .
RUN npm run build

## Install Backend Server
WORKDIR /server

COPY ./server/package*.json ./
RUN npm install

COPY ./server .
# RUN npm run build


## Start Server
ENV PORT 8181

#CMD ["tail", "-f", "/dev/null"]

WORKDIR /server

# COPY lighttpd.conf /lighttpd.conf
# COPY entrypoint.sh /entrypoint.sh
# COPY --from=build-stage --chown=${UID}:${GID} /app/dist /www/
# COPY --from=build-stage --chown=${UID}:${GID} /app/dist/assets /www/default-assets

# USER ${UID}:${GID}

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT}/ || exit 1

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]

# ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
