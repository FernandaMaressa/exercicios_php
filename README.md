# Exercícios PHP - Programação Web

Este projeto contém exercícios de PHP utilizando Apache, MySQL e Docker Compose.

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
- Porta **3306** disponível (para o MySQL)
- Porta **8081** disponível (para o phpMyAdmin)
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

## Rodando o Ambiente com Docker

### Passo 1: Suba os serviços com Docker Compose

No terminal, dentro da pasta do projeto:
```bash
docker compose up --build -d
```

Este comando sobe três serviços automaticamente:
- **web** - Servidor PHP 8.2 com Apache
- **db** - Banco de dados MySQL 8.0
- **phpmyadmin** - Interface visual para gerenciar o banco

O banco de dados `novos_titans_db` e as tabelas dos exercícios são criados automaticamente na primeira execução pelos arquivos `.sql` de cada exercício.

### Passo 2: Acesse no navegador

- Projeto: [http://localhost:8080](http://localhost:8080)
- phpMyAdmin: [http://localhost:8081](http://localhost:8081)

### Credenciais do banco de dados

| Campo    | Valor            |
|----------|------------------|
| Host     | db               |
| Banco    | novos_titans_db  |
| Usuário  | root             |
| Senha    | root             |

### Verificando se o ambiente subiu

Execute:
```bash
docker compose ps
```

Deve aparecer os três containers com status `Up`.

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
│   ├── exercicio6.cy.js
│   └── exercicio10.cy.js
├── fixtures/
├── support/
└── cypress.config.js
```

---

## Comandos Úteis

### Docker
```bash
# Subir e reconstruir os containers
docker compose up --build -d

# Parar containers sem remover
docker compose stop

# Parar e remover containers (mantém os dados do banco)
docker compose down

# Parar, remover containers e apagar volume do banco (reset completo)
docker compose down -v

# Ver logs de todos os containers
docker compose logs -f

# Ver logs apenas do banco de dados
docker compose logs -f db

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
npx cypress run --spec "cypress/e2e/exercicio10.cy.js"

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
├── exercicio2/
├── exercicio3/
├── exercicio4/
├── exercicio5/
├── exercicio6/
│   ├── index.php
│   ├── processar.php
│   └── style.css
├── exercicio10/
│   ├── db/
│   │   └── banco.sql
│   ├── img/
│   ├── index.php
│   ├── processar.php
│   ├── conexao.php
│   └── style.css
├── cypress/
│   ├── e2e/
│   │   └── exercicio10.cy.js
│   └── support/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── cypress.config.js
├── .gitignore
└── README.md
```

---

## Configuração do Ambiente

### Arquivo `Dockerfile`

```dockerfile
FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod rewrite

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html
```

### Arquivo `docker-compose.yml`

```yaml
services:

  web:
    build: .
    ports:
      - "8080:80"
    volumes:
      - .:/var/www/html
    depends_on:
      db:
        condition: service_healthy
    networks:
      - titans-network

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: novos_titans_db
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      - ./exercicio10/db:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-uroot", "-proot"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - titans-network

  phpmyadmin:
    image: phpmyadmin:latest
    restart: always
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      PMA_USER: root
      PMA_PASSWORD: root
    depends_on:
      - db
    networks:
      - titans-network

volumes:
  db_data:

networks:
  titans-network:
    driver: bridge
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
    "test:e6": "cypress run --spec 'cypress/e2e/exercicio6.cy.js'",
    "test:e10": "cypress run --spec 'cypress/e2e/exercicio10.cy.js'"
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

## Banco de Dados

O projeto utiliza MySQL 8.0 gerenciado pelo Docker. O banco `novos_titans_db` é criado automaticamente na primeira execução. Cada exercício que utiliza banco de dados possui sua própria pasta `db/` com o arquivo `banco.sql` contendo a estrutura da tabela correspondente.

### Resetar o banco de dados

Caso precise recriar o banco do zero (apaga todos os dados):
```bash
docker compose down -v
docker compose up --build -d
```

### Acessar o phpMyAdmin

Acesse [http://localhost:8081](http://localhost:8081) para visualizar e gerenciar os dados diretamente pelo navegador sem necessidade de instalar nenhuma ferramenta adicional.

---

## Workflow Completo

### Para desenvolver
```bash
# 1. Clone o projeto
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php

# 2. Suba o ambiente Docker
docker compose up --build -d

# 3. Instale as dependências do Node
npm install

# 4. Abra o Cypress para testar
npx cypress open

# 5. Acesse no navegador para testar manualmente
# http://localhost:8080
# http://localhost:8081 (phpMyAdmin)
```

### Para rodar testes automatizados
```bash
# Certifique-se que o Docker está rodando
docker compose up -d

# Rode todos os testes
npm test

# Ou rode apenas o Exercício 10
npm run test:e10
```

---

## Troubleshooting

### Problema: Porta 8080, 8081 ou 3306 já está em uso
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

### Problema: Erro de conexão com o banco de dados
```bash
# Verifique se o container do banco subiu corretamente
docker compose logs -f db

# Aguarde a mensagem "ready for connections" antes de acessar o projeto
# Se necessário, recrie o banco do zero
docker compose down -v
docker compose up --build -d
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
- **Documentação MySQL:** [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)
- **Node.js:** [https://nodejs.org/](https://nodejs.org/)