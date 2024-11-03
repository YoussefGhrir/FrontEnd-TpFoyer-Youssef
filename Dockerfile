### STAGE 1: Build ###
FROM node:14.20-alpine AS build
WORKDIR /usr/src/app

# Copier les fichiers package pour installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du projet et construire
COPY . .
RUN npm run build -- --configuration production --verbose

# Optionnel : Vérifier que le dossier de build est généré
RUN ls -la /usr/src/app/dist/tpfoyer-front

EXPOSE 80

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine

# Copier le fichier de configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers de build depuis l'étape de build
COPY --from=build /usr/src/app/dist/tpfoyer-front /usr/share/nginx/html
