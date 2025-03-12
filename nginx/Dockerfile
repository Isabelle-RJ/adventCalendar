# Utilise Nginx basé sur Alpine
FROM nginx:alpine

# Installe bash et gettext pour envsubst
RUN apk add --no-cache bash gettext

# Copie les fichiers de template dans le conteneur
COPY default.conf.template /etc/nginx/template/default.conf.template
COPY default.prod.conf.template /etc/nginx/template/default.prod.conf.template

# Commande d'entrée : Choisit le bon template en fonction de l'environnement
CMD ["/bin/sh", "-c", "\
    if [ \"$ENVIRONMENT\" = \"production\" ]; then \
        TEMPLATE=/etc/nginx/template/default.prod.conf.template; \
    else \
        TEMPLATE=/etc/nginx/template/default.conf.template; \
    fi; \
    envsubst '$$SERVER_NAME' < $TEMPLATE > /etc/nginx/conf.d/default.conf && \
    exec nginx -g 'daemon off;'"]
