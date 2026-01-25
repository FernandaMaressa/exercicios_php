# Exercícios PHP - Programação Web

Este projeto contém exercícios de PHP utilizando Apache e Docker Compose.

---

## Pré-requisitos

Para rodar o projeto, você precisa ter instalado:

- **Docker** - [Download Docker](https://www.docker.com/get-started)
- **Docker Compose** (já incluído no Docker Desktop)
- **Node.js** (versão 18 ou superior) - [Download Node.js](https://nodejs.org/)
- **npm** (instalado automaticamente com Node.js)

### Verificar instalações
```bash
docker --version
docker compose version
node --version
npm --version
```

### Requisitos de Sistema

- Porta **8080** disponível (para o Apache)
- Sistema operacional: Windows, Linux ou MacOS

---

## Obtendo o Projeto

Você pode obter o projeto de duas formas:

### Opção 1: Baixar como ZIP (sem Git)

1. Acesse: [https://github.com/FernandaMaressa/exercicios_php](https://github.com/FernandaMaressa/exercicios_php)
2. Clique no botão verde **"Code"**
3. Selecione **"Download ZIP"**
4. Extraia o arquivo ZIP
5. Abra o terminal na pasta extraída

### Opção 2: Clonar com Git (recomendado)

Se você tiver o Git instalado:
```bash
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php
```

**Download Git (opcional):** [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

## Rodando o Ambiente PHP com Docker

### Passo 1: Suba os serviços com Docker Compose

No terminal, dentro da pasta do projeto:
```bash
docker compose up -d
```

### Passo 2: Acesse no navegador

Abra: [http://localhost:8080](http://localhost:8080)

### Verificando se o ambiente subiu

Execute:
```bash
docker ps
```

Deve aparecer algo como:
```
CONTAINER ID   IMAGE              COMMAND                  STATUS
abc123def456   php:8.2-apache     "docker-php-entryp..."   Up 2 minutes
```

Se aparecer, o projeto está rodando com sucesso.

---

## Configurando Testes com Cypress

### Passo 3: Instale as dependências do Node.js

Na raiz do projeto (`exercicios_php`), execute:
```bash
npm install
```

**Importante:** A pasta `node_modules/` não é versionada no Git. Este comando criará ela localmente com todas as dependências necessárias.

### Passo 4: Abra o Cypress

**Modo interativo (recomendado para desenvolvimento):**
```bash
npx cypress open
```

**Modo headless (rodar todos os testes):**
```bash
npx cypress run
```

### Estrutura de Testes

Os testes estão organizados em:
```
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
```

---

## Comandos Úteis

### Docker
```bash
# Parar containers sem remover
docker compose stop

# Parar e remover containers
docker compose down

# Ver logs do container
docker compose logs -f

# Reiniciar o ambiente
docker compose restart
```

### Cypress
```bash
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
```

### Node.js
```bash
# Instalar dependências
npm install

# Atualizar dependências
npm update

# Ver versão do Node
node --version

# Ver versão do npm
npm --version
```

---

## Estrutura do Projeto
```
exercicios_php/
├── exercicio1/
│   ├── front/
│   └── back/
├── exercicio2/
├── exercicio3/
├── exercicio4/
├── exercicio5/
├── exercicio6/
│   ├── index.php
│   ├── processar.php
│   └── style.css
├── cypress/
│   ├── e2e/
│   │   └── exercicio6.cy.js
│   └── support/
├── docker-compose.yml
├── package.json
├── cypress.config.js
├── .gitignore
└── README.md
```

---

## Configuração do Ambiente

### Arquivo `docker-compose.yml`

Este arquivo está na raiz do repositório:
```yaml
version: "3.8"

services:
  web:
    image: php:8.2-apache
    ports:
      - "8080:80"
    volumes:
      - ./:/var/www/html
```

### Arquivo `package.json`
```json
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
```

### Arquivo `cypress.config.js`
```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true
  }
})
```

---

## Importante: Arquivo .gitignore

A pasta `node_modules/` **não é versionada** no Git.

Após baixar o projeto, você **deve** instalar as dependências:
```bash
npm install
```

Isso criará a pasta `node_modules/` localmente com todas as dependências necessárias.

### Conteúdo do .gitignore

O projeto possui um `.gitignore` que ignora:

- `node_modules/` - Dependências do Node.js (devem ser instaladas com `npm install`)
- `cypress/videos/` - Vídeos dos testes
- `cypress/screenshots/` - Screenshots de falhas
- Arquivos temporários do sistema operacional

---

## Workflow Completo

### Para desenvolver
```bash
# 1. Baixe o projeto (ZIP ou Git clone)
# Se usar Git:
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
```

### Para rodar testes automatizados
```bash
# Certifique-se que o Docker está rodando
docker compose up -d

# Rode todos os testes
npm test

# Ou rode apenas o Exercício 6
npm run test:e6
```

---

## Troubleshooting

### Problema: Porta 8080 já está em uso
```bash
# Linux/Mac:
lsof -i :8080

# Windows:
netstat -ano | findstr :8080

# Solução: Mate o processo ou altere a porta no docker-compose.yml
```

### Problema: Docker não inicia
```bash
# Verifique se o Docker está rodando
docker info

# Reinicie o Docker Desktop
```

### Problema: Cypress não encontra baseUrl
```bash
# Certifique-se que o Docker está rodando
docker compose ps

# Verifique se consegue acessar
curl http://localhost:8080
```

### Problema: npm install falha
```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale
npm install
```

---

## Recursos Adicionais

- **Documentação PHP:** [https://www.php.net/](https://www.php.net/)
- **Documentação Docker:** [https://docs.docker.com/](https://docs.docker.com/)
- **Documentação Cypress:** [https://docs.cypress.io/](https://docs.cypress.io/)
- **Node.js:** [https://nodejs.org/](https://nodejs.org/)


