# Build stage
FROM ubuntu:22.04 as hugo

ARG TARGETARCH
ARG HUGO_VERSION="0.119.0"

RUN apt update && apt install -y wget git ca-certificates curl gnupg

# Install nodejs
# https://github.com/nodesource/distributions#installation-instructions
ARG NODE_MAJOR=20

RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN NODE_MAJOR=${NODE_MAJOR} echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install -y nodejs

# Install hugo
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${TARGETARCH}.deb
RUN dpkg -i hugo_extended_${HUGO_VERSION}_linux-${TARGETARCH}.deb

# WORKDIR /app
ADD . /app/

WORKDIR /app/themes/docsy

RUN npm install

WORKDIR /app/

RUN npm install autoprefixer postcss-cli

RUN hugo \
    --baseURL="https://www.axoflow.com/docs/axosyslog-core" \
    -e production \
    --enableGitInfo \
    --ignoreCache

# Run stage
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

RUN sed -i 's/server {/server {\n    absolute_redirect off;/' /etc/nginx/conf.d/default.conf
RUN sed -i 's/http {/http {\n    server_tokens off;/' /etc/nginx/nginx.conf
COPY --from=hugo /app/public ./axosyslog-core
