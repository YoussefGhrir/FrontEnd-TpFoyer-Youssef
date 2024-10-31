# Étape 1 : Construction de l'application Angular
FROM node:16-alpine AS build

# Installer Angular CLI
RUN npm install -g @angular/cli@15.2.6

WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application en mode production
RUN ng build --configuration production

# Étape 2 : Servir l'application avec Nginx
FROM nginx:1.23-alpine

# Supprimer la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier votre configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d

# Copier les fichiers construits de l'application Angular
COPY --from=build /usr/src/app/dist/tpfoyer-front /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer 
CMD ["nginx", "-g", "daemon off;"]
