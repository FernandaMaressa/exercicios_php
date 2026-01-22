# Exercícios PHP - Programação Web

Este projeto contém exercícios de PHP utilizando Apache e Docker Compose.

---

## *Pré-requisitos*

Antes de rodar o projeto, instale:

- *Git* - [Download Git](https://git-scm.com/downloads)
- *Docker* - [Download Docker](https://www.docker.com/get-started)
- *Docker Compose* (já incluído no Docker Desktop)
- *Node.js* (versão 18 ou superior) - [Download Node.js](https://nodejs.org/)
- *npm* (instalado automaticamente com Node.js)

### *Verificar instalações:*
bash
git --version
docker --version
docker compose version
node --version
npm --version


### *Requisitos de Porta:*
- Porta *8080* livre (Apache)

---

## *📦 Instalação*

### *1️⃣ Clone o repositório*
bash
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php


---

## *🐳 Rodando o Ambiente PHP com Docker*

### *2️⃣ Suba os serviços com Docker Compose*

*Linux / MacOS / Windows:*
bash
docker compose up -d


### *3️⃣ Acesse no navegador*

Abra: [http://localhost:8080](http://localhost:8080)

### *✅ Verificando se o ambiente subiu*

Execute:
bash
docker ps


Deve aparecer algo como:

CONTAINER ID   IMAGE              COMMAND                  STATUS
abc123def456   php:8.2-apache     "docker-php-entryp..."   Up 2 minutes


Se aparecer, o projeto está rodando com sucesso! ✅

---

## *🧪 Configurando Testes com Cypress*

### *4️⃣ Instale as dependências do Node.js*

Na raiz do projeto (exercicios_php), execute:
bash
npm install


Isso instalará o Cypress e todas as dependências listadas no package.json.

### *5️⃣ Abra o Cypress*

*Modo interativo (recomendado para desenvolvimento):*
bash
npx cypress open


### *6️⃣ Estrutura de Testes*

Os testes estão organizados em:

cypress/
├── e2e/
│   ├── exercicio1.cy.js
│   ├── exercicio2.cy.js
│   ├── exercicio3.cy.js
│   ├── exercicio4.cy.js
│   ├── exercicio5.cy.js
│   └── exercicio6.cy.js
├── fixtures/
├── support/
└── cypress.config.js

---

## *🛠️ Comandos Úteis*

### *Docker:*
bash
# Parar containers sem remover
docker compose stop

# Parar e remover containers
docker compose down

# Ver logs do container
docker compose logs -f

# Reiniciar o ambiente
docker compose restart


### *Cypress:*
bash
# Instalar Cypress
npm install cypress --save-dev

# Abrir interface do Cypress
npx cypress open

# Rodar todos os testes (headless)
npx cypress run

# Rodar teste específico
npx cypress run --spec "cypress/e2e/exercicio6.cy.js"

# Rodar testes no Chrome
npx cypress run --browser chrome

# Rodar testes no Firefox
npx cypress run --browser firefox


### *Node.js:*
bash
# Instalar dependências
npm install

# Atualizar dependências
npm update

# Ver versão do Node
node --version

# Ver versão do npm
npm --version


---

## *⚙️ Configuração do Ambiente*

### *Arquivo docker-compose.yml*

Este arquivo deve estar na raiz do repositório:
yaml
version: "3.8"

services:
  web:
    image: php:8.2-apache
    ports:
      - "8080:80"
    volumes:
      - ./:/var/www/html


### *Arquivo package.json*
json
{
  "name": "exercicios-php",
  "version": "1.0.0",
  "description": "Exercícios de PHP com testes automatizados",
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test": "cypress run",
    "test:e6": "cypress run --spec 'cypress/e2e/exercicio6.cy.js'"
  },
  "devDependencies": {
    "cypress": "^13.6.0"
  }
}


### *Arquivo cypress.config.js*
javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true
  }
})


---

## *🚀 Workflow Completo*

### *Para desenvolver:*
bash
# 1. Clone o repositório
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php

# 2. Suba o ambiente Docker
docker compose up -d

# 3. Instale as dependências do Node
npm install

# 4. Abra o Cypress para testar
npx cypress open

# 5. Acesse no navegador para testar manualmente
# http://localhost:8080


### *Para rodar testes automatizados:*
bash
# Certifique-se que o Docker está rodando
docker compose up -d

# Rode todos os testes
npm test

# Ou rode apenas o Exercício 6
npm run test:e6

---

## *📚 Recursos Adicionais*

- *Documentação PHP:* [https://www.php.net/](https://www.php.net/)
- *Documentação Docker:* [https://docs.docker.com/](https://docs.docker.com/)
- *Documentação Cypress:* [https://docs.cypress.io/](https://docs.cypress.io/)
- *Node.js:* [https://nodejs.org/](https://nodejs.org/)

