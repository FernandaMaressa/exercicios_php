📘 Como Rodar o Exercício 
Este projeto utiliza PHP 8.2, Apache e Docker Compose para executar o front-end do Exercício 1.

✅ Pré-requisitos

Antes de rodar o projeto, instale:
Git
Docker
Docker Compose
👉 No Linux e Mac, o comando é docker compose (com espaço)
👉 No Windows também funciona docker compose
Porta 8080 livre

🚀 Como Rodar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php

2️⃣ Suba os serviços com Docker Compose
🔹 Linux / MacOS
Use:
docker compose up -d

🔹 Windows (PowerShell ou CMD)
Também use:
docker compose up -d

3️⃣ Acesse no navegador

Abra:
http://localhost:8080


ou
http://localhost:8080/index.html


🛑 Parando o Ambiente
Parar containers sem remover:
docker compose stop

Parar e remover tudo:
docker compose down

📦 Arquivo docker-compose.yml
Este arquivo deve estar na raiz do repositório (branch main):

version: "3.8"

services:
  web:
    image: php:8.2-apache
    ports:
      - "8080:80"
    volumes:
      - ./exercicio1:/var/www/html

🔍 Verificando se o ambiente subiu

Execute:
docker ps

E verifique se aparece algo como:
php:8.2-apache

Se aparecer, o projeto está rodando com sucesso.