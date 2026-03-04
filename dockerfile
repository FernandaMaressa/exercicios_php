# ============================================================
# Dockerfile — EcoVolt
# Imagem PHP 8.2 + Apache + extensão PDO MySQL
# ============================================================

FROM php:8.2-apache

# Instala a extensão PDO MySQL para conectar ao banco
RUN docker-php-ext-install pdo pdo_mysql

# Habilita mod_rewrite do Apache
RUN a2enmod rewrite

# Copia os arquivos do projeto para o servidor
COPY . /var/www/html/

# Permissões para o Apache
RUN chown -R www-data:www-data /var/www/html