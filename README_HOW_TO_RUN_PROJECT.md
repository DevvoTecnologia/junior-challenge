# Documentação do Projeto

## Introdução
Este projeto consiste em uma aplicação full-stack composta por um backend em **Node.js com Express e PostgreSQL** e um frontend em **Next.js**.

---
## Como Rodar o Projeto

## COPIE OS DADOS DO .ENV.EXAMPLE PARA UM ARQUIVO .ENV NA RAIZ DO PROJETO BACKEND E .ENV.LOCAL NO FRONTEND

### 1️⃣ **Rodando via Docker** (Recomendado)

1. Certifique-se de que possui **Docker** e **Docker Compose** instalados.
2. No diretório raiz do projeto, execute:
   ```sh
   docker-compose up --build
   ```
## use o comando: docker exec -i my_postgres_db psql -U postgres -d mydatabase < backup.sql

3. O backend e frontend serão iniciados automaticamente.
4. Acesse:
   - **Frontend:** http://localhost:3000
   - **Backend:** http://localhost:5000

---
## Backend (API)

### 🔹 **Criar um Anel**
- **Rota:** `POST /api/create-ring`
- **Descrição:** Cria um novo anel e o associa a um usuário.
- **Body (JSON):**
  ```json
  {
    "email": "usuario@email.com",
    "name": "Anel do Poder",
    "power": "Invisibilidade",
    "carrier": "Frodo",
    "forjer": "elfs",
    "image": "https://url.com/imagem.jpg"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "message": "Anel criado e atribuído ao usuário com sucesso",
    "user": {...}
  }
  ```

### 🔹 **Atualizar um Anel**
- **Rota:** `PUT /api/update-ring/:email/:ring_id`
- **Descrição:** Atualiza as informações de um anel específico de um usuário.
- **Body (JSON):**
  ```json
  {
    "name": "Novo Nome do Anel",
    "power": "Nova habilidade",
    "carrier": "Novo portador",
    "forjer": "Novo forjador",
    "image": "https://nova-imagem.com/anel.jpg"
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "message": "Anel atualizado com sucesso",
    "updatedRing": {...}
  }
  ```

### 🔹 **Buscar Todos os Anéis**
- **Rota:** `GET /api/rings`
- **Descrição:** Retorna todos os anéis cadastrados.
- **Resposta de Sucesso:**
  ```json
  {
    "rings": [{...}, {...}]
  }
  ```

### 🔹 **Buscar Anéis por Usuário**
- **Rota:** `GET /api/rings/:user_email`
- **Descrição:** Retorna todos os anéis de um usuário específico.
- **Resposta de Sucesso:**
  ```json
  {
    "rings": [{...}, {...}]
  }
  ```

### 🔹 **Deletar um Anel**
- **Rota:** `DELETE /api/delete-ring/:user_email/:ring_id`
- **Descrição:** Remove um anel de um usuário baseado no email e ID do anel.
- **Resposta de Sucesso:**
  ```json
  { "message": "Anel removido com sucesso" }
  ```

---
# Documentação do Projeto

## Introdução
Este projeto consiste em uma aplicação full-stack composta por um backend em **Node.js com Express e PostgreSQL** e um frontend em **Next.js**.

---
## Como Rodar o Projeto

### 1️⃣ **Rodando via Docker** (Recomendado)

1. Certifique-se de que possui **Docker** e **Docker Compose** instalados.
2. No diretório raiz do projeto, execute:
   ```sh
   docker-compose up --build
   ```
3. O backend e frontend serão iniciados automaticamente.
4. Acesse:
   - **Frontend:** http://localhost:3000
   - **Backend:** http://localhost:5000

### 2️⃣ **Rodando Manualmente**
#### Backend
1. Acesse a pasta do backend:
   ```sh
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o arquivo **.env** com as credenciais do banco de dados.
4. Execute o backend:
   ```sh
   npm run dev
   ```
5. O backend estará rodando em http://localhost:5000

#### Frontend
1. Acesse a pasta do frontend:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o arquivo **.env.local** com a URL do backend.
4. Execute o frontend:
   ```sh
   npm run dev
   ```
5. O frontend estará rodando em http://localhost:3000

---
## Frontend (Next.js)

### 📌 **Componentes Principais**

#### **Alteração de tema**
-- Função simples que permite a troca entre tema claro e escuro com base em css puro.


#### **Página Inicial**
Arquivo: `/src/ui/paegs/HomePage.tsx`

- Mostra a listagem de anéis de todos os usuários cadastrados.
- Permite acessar página de login, cadastro ou dashboard se tiver logado.


#### **Página Dashboard**
Arquivo: `/src/ui/paegs/DashboardPage.tsx`

- Mostra a lista de Anéis do usuario, permitindo editar, Remover
- Permite Cadastrar um novo Anel.

### 📌 **Tratamento de Erros**
- Se houver erro ao criar um anel, o erro é exibido abaixo do formulário.
- Se a API retornar um erro ao buscar anéis, uma mensagem de erro é exibida na tela.
