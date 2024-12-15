DOCKER_COMPOSE = docker-compose
PHP_CONTAINER = app
NGINX_CONTAINER = nginx-server
FRONT_END_CONTAINER = bun
ARTISAN = $(DOCKER_COMPOSE) exec $(PHP_CONTAINER) php artisan
COMPOSER = $(DOCKER_COMPOSE) exec $(PHP_CONTAINER) composer
BUN = $(DOCKER_COMPOSE) exec $(FRONT_END_CONTAINER) bun
CURRENT_UID := $(shell id -u)
CURRENT_GID := $(shell id -g)

.PHONY: api client keygen migrate link cache setup_php fresh help

# Commandes par défaut
all: help

# Commandes pour Docker
up:
	@echo "🚀 Démarrage des conteneurs..."
	$(DOCKER_COMPOSE) up -d --build

down:
	@echo "🛑 Arrêt des conteneurs..."
	$(DOCKER_COMPOSE) down

restart:
	@echo "🔄 Redémarrage des conteneurs..."
	$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up -d

logs:
	@echo "📜 Affichage des logs Nginx..."
	$(DOCKER_COMPOSE) logs -f $(NGINX_CONTAINER)

init-api:
	@echo "Création du projet Laravel..."
	$(DOCKER_COMPOSE) exec $(PHP_CONTAINER) composer create-project --prefer-dist laravel/laravel .
	make perm

init-client:
	@echo "Création du projet Next..."
	$(DOCKER_COMPOSE) exec $(FRONT_END_CONTAINER) bun create vite@latest . --template react-ts
	make perm

api:
	@echo "🎯 Initialisation du projet Laravel..."
	$(COMPOSER) install
	make keygen
	make link
	make perm
	make migrate

client:
	@echo "🎯 Initialisation du projet React..."
	$(DOCKER_COMPOSE) exec -d bun sh -c "bun install && bun dev"

keygen:
	@echo "🔑 Génération de la clé d'application Laravel..."
	$(ARTISAN) key:generate

migrate:
	@echo "📂 Exécution des migrations..."
	$(ARTISAN) migrate

link:
	@echo "🔗 Création d'un lien symbolique pour le local storage..."
	$(ARTISAN) storage:link

cache:
	@echo "🧹 Nettoyage et mise en cache des configurations..."
	$(ARTISAN) config:clear
	$(ARTISAN) cache:clear
	$(ARTISAN) config:cache

artisan:
	$(ARTISAN) $(cmd)

composer:
	$(COMPOSER) $(cmd)

bun:
	$(BUN) $(cmd)

# Commandes pour le développement
perm:
	@echo "🔧 Configuration des permissions..."
	@sudo chown -R ${CURRENT_UID}:$(CURRENT_GID) ./
	sudo chmod -R 777 api/storage api/bootstrap/cache

fresh:
	@echo "♻️ Réinitialisation complète de la base de données..."
	$(ARTISAN) migrate:fresh --seed

# Commandes d'aide
help:
	@echo "Commandes disponibles :"
	@echo "  make up         -> Démarre les conteneurs Docker"
	@echo "  make down       -> Arrête les conteneurs Docker"
	@echo "  make restart    -> Redémarre les conteneurs Docker"
	@echo "  make logs       -> Affiche les logs du conteneur Nginx"
	@echo "  make init       -> Configure Laravel (install, keygen, migrate)"
	@echo "  make api         -> Installe les dépendances Composer et init le projet Laravel"
	@echo "  make client     -> init le projet Next"
	@echo "  make keygen     -> Génère la clé d'application Laravel"
	@echo "  make migrate    -> Exécute les migrations Laravel"
	@echo "  make link         -> Créé un lien symbolique pour le local storage"
	@echo "  make cache      -> Nettoie et met en cache les configurations"
	@echo "  make fresh      -> Réinitialise la base de données"
	@echo "  make perm       -> Configure les permissions des dossiers"
