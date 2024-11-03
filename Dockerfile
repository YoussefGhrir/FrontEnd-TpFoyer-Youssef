### STAGE 1: Build ###
FROM node:18.20-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build 
EXPOSE 80
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/tpfoyer-front /usr/share/nginx/html