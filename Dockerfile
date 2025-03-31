FROM alpine:3.18 AS builder

RUN apk add --no-cache nodejs npm curl

ARG VERSION=1.0
ENV VERSION=$VERSION

WORKDIR /app
COPY package.json .
RUN npm install
COPY server.js .

RUN node server.js > /app/index.html

FROM nginx:1.25-alpine

COPY --from=builder /app/index.html /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# Port 80 jest domyślnie eksponowany w obrazie Nginx