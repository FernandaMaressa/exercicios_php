**Como Rodar o Exercício**
_Este projeto utiliza PHP 8.2, Apache e Docker Compose para executar o front-end do Exercício 1._

**Pré-requisitos**
_Antes de rodar o projeto, instale:_
Git
Docker
Docker Compose
👉 No **Linux e Mac**, o comando é docker compose (com espaço)
👉 No **Windows** também funciona docker compose
Porta 8080 livre

**Como Rodar o Projeto**
1️⃣ _Clone o repositório_
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php

2️⃣ _Suba os serviços com Docker Compose_
**Linux / MacOS**
_Use:_
docker compose up -d

**Windows (PowerShell ou CMD)**
_Também use:_
docker compose up -d

3️⃣ _Acesse no navegador_
_Abra:_
http://localhost:8080

_ou_
http://localhost:8080/index.html

**Parando o Ambiente**
_Parar containers sem remover:_
docker compose stop

_Parar e remover tudo:_
docker compose down

_Arquivo docker-compose.yml_
Este arquivo deve estar na raiz do repositório (branch main):

version: "3.8"

services:
  web:
    image: php:8.2-apache
    ports:
      - "8080:80"
    volumes:
      - ./:/var/www/html

🔍 Verificando se o ambiente subiu

Execute:
docker ps

E verifique se aparece algo como:
php:8.2-apache

Se aparecer, o projeto está rodando com sucesso.
