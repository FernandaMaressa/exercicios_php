# Exercício 1 - Para Fernanda

**Projeto Novos Titans**

---

## 📝 Enunciado do Exercício

Criar um sistema que leia o nome e a idade de uma pessoa e informe se ela é **maior de idade** (18 anos ou mais) ou **menor de idade** (menos de 18 anos).

---

## 🎯 Objetivo do Exercício

- Treinar estrutura básica de **HTML** com formulário
- Treinar estrutura básica de **PHP** recebendo dados
- Treinar uso de **if e else**

---

## 📋 Requisitos

### Formulário HTML (index.html)
- Campo para digitar o nome
- Campo para digitar a idade
- Botão para enviar os dados

### Processamento PHP (processar.php)
- Receber o nome e a idade
- Verificar se a idade é maior ou igual a 18
- Se for maior ou igual a 18: exibir mensagem informando que a pessoa é maior de idade
- Se for menor que 18: exibir mensagem informando que a pessoa é menor de idade
- Exibir o nome da pessoa junto com a mensagem
- Botão para voltar ao formulário

### Estilização CSS (style.css)
- Estilizar o formulario e pagina.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- Docker instalado e rodando
- Git instalado
- Porta **8080** disponível

### Instruções Passo a Passo

#### 1. Clone o repositório
```bash
git clone https://github.com/FernandaMaressa/exercicios_php.git
cd exercicios_php
```

#### 2. Mude para a branch nvt146-frontend
```bash
git checkout nvt146-frontend
```

#### 3. Suba o container Docker com PHP e Apache

**Para Linux/Mac:**
```bash
docker run -d -p 8080:80 -v $(pwd)/exercicio1:/var/www/html --name exercicio1-container php:8.2-apache
```

**Para Windows (PowerShell):**
```bash
docker run -d -p 8080:80 -v ${PWD}/exercicio1:/var/www/html --name exercicio1-container php:8.2-apache
```

**Para Windows (CMD):**
```bash
docker run -d -p 8080:80 -v %cd%/exercicio1:/var/www/html --name exercicio1-container php:8.2-apache
```

#### 4. Acesse no navegador
```
http://localhost:8080
```

Ou:
```
http://localhost:8080/index.html
```

---

## 🛑 Como Parar o Container

#### Parar o container
```bash
docker stop exercicio1-container
```

#### Remover o container (se necessário)
```bash
docker rm exercicio1-container
```

#### Ver containers rodando
```bash
docker ps
```

#### Ver todos os containers (incluindo parados)
```bash
docker ps -a
```

---

## 🔄 Próximos Passos (Backend)

Esta branch contém apenas o frontend. O backend será desenvolvido na branch **nvt153-backend** e incluirá:

- **processar.php**: Arquivo PHP que receberá os dados do formulário
- Lógica de validação da idade (if/else)
- Exibição da mensagem personalizada
- Botão para voltar ao formulário

## 🧪 Testando o Frontend

Ao acessar `http://localhost:8080`, você deve ver:

1. Um formulário centralizado com fundo rosa/roxo
2. Título "VERIFICAR IDADE"
3. Campo "Nome" (texto)
4. Campo "Idade" (número)
5. Botão "Enviar" com efeito hover

**Observação**: Como o backend ainda não foi implementado, ao clicar em "Enviar" nada acontecerá. Isso é esperado nesta branch.
