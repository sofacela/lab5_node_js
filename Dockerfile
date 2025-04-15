FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN npm install
COPY server.js ./

FROM nginx:1.25-alpine

RUN apk add --no-cache nodejs

WORKDIR /app
COPY --from=builder /app .

COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG VERSION=1.0
ENV VERSION=$VERSION

EXPOSE 80  
EXPOSE 3000 

CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1