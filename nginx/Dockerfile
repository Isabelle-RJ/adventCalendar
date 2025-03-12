# Utilise Nginx basé sur Alpine
FROM nginx:alpine

# Installe bash et gettext pour envsubst
RUN apk add --no-cache bash gettext

# Copie les fichiers de template dans le conteneur
COPY default.conf.template /etc/nginx/template/default.conf.template
COPY default.prod.conf.template /etc/nginx/template/default.prod.conf.template
COPY default.api.conf.template /etc/nginx/template/default.api.conf.template

# Commande d'entrée : Choisit le bon template en fonction de l'environnement
CMD ["/bin/sh", "-c", "\
    if [ \"$ENVIRONMENT\" = \"production\" ]; then \
        envsubst '$$SERVER_NAME $$API_SERVER_NAME' < /etc/nginx/template/default.prod.conf.template > /etc/nginx/conf.d/default.prod.conf && \
        envsubst '$$API_SERVER_NAME' < /etc/nginx/template/default.api.conf.template > /etc/nginx/conf.d/default.api.conf; \
    else \
        envsubst '$$SERVER_NAME' < /etc/nginx/template/default.conf.template > /etc/nginx/conf.d/default.conf; \
    fi; \
    exec nginx -g 'daemon off;'"]