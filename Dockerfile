FROM php:8.3-fpm

RUN apt-get update \
    && apt-get install -y git \
    curl \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_pgsql mbstring zip gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer -V