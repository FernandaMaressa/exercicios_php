
# Branch: nvt146-frontend

## 📋 Descrição

Esta branch contém o **frontend** do Exercício 1 - Verificação de Idade.

---

## 🎨 O que foi desenvolvido no Frontend

### Arquivos Criados

- **index.html**: Estrutura HTML do formulário
- **style.css**: Estilização visual do projeto

### Funcionalidades Implementadas

#### **index.html**
- Formulário com dois campos de entrada:
  - **Nome**: Campo de texto obrigatório para o usuário digitar seu nome
  - **Idade**: Campo numérico obrigatório para o usuário digitar sua idade
- Botão "Enviar" para submeter os dados
- Estrutura semântica HTML5
- Validação HTML nativa (campos required)

#### **style.css**
- **Layout centralizado**: Formulário centralizado vertical e horizontalmente na tela
- **Container estilizado**: 
  - Fundo rosa/roxo claro (`rgb(238, 196, 248)`)
  - Bordas arredondadas (12px)
  - Sombra suave para profundidade
  - Largura fixa de 400px
  - Padding interno de 30px
- **Inputs personalizados**:
  - Bordas roxas (`#d07ff3`)
  - Bordas arredondadas (7px)
  - Padding confortável (10px)
  - Largura 100% do container
- **Botão interativo**:
  - Cor de fundo roxa (`#d07ff3`)
  - Texto branco
  - Efeito hover com animação de escala (scale 1.02)
  - Transição suave de 0.3s
  - Cursor pointer
  - Largura 100%
- **Responsividade**: Design adaptável usando flexbox

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

---

## 📂 Estrutura de Arquivos

```
exercicios_php/
├── exercicio1/
│   ├── index.html    # Formulário HTML
│   └── style.css     # Estilos CSS
└── README.md         # Documentação do projeto
```

---

## 🧪 Testando o Frontend

Ao acessar `http://localhost:8080`, você deve ver:

1. Um formulário centralizado com fundo rosa/roxo
2. Título "VERIFICAR IDADE"
3. Campo "Nome" (texto)
4. Campo "Idade" (número)
5. Botão "Enviar" com efeito hover

**Observação**: Como o backend ainda não foi implementado, ao clicar em "Enviar" nada acontecerá. Isso é esperado nesta branch.

---

## 👨‍💻 Autor

**Fernanda Maressa** - Projeto Novos Titans

---

## 📝 Commits desta Branch

- ✅ Estrutura HTML do formulário criada
- ✅ Estilização CSS completa
- ✅ Layout responsivo implementado

