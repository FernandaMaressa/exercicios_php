📘 README – Como Rodar
✅ Pré-requisitos

Antes de rodar o projeto, instale:

Git

Docker

Docker Compose

Porta 8080 livre

🚀 Como Rodar o Exercício 
1. Clone o repositório e entre na pasta
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php

2. Execute o Docker Compose

O arquivo docker-compose.yml já deve estar na branch main.

docker-compose up -d

3. Acesse o projeto no navegador

Abra:

http://localhost:8080


Ou:

http://localhost:8080/index.html


🛑 Parando o Servidor
Parar os containers
docker-compose stop

Derrubar tudo
docker-compose down

📦 docker-compose.yml usado no projeto

Coloque esse arquivo na raiz do repositório:

version: "3.8"

services:
  php-apache:
    image: php:8.2-apache
    container_name: exercicio1-container
    ports:
      - "8080:80"
    volumes:
      - ./exercicio1:/var/www/html
