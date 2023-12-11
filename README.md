# Banco


## Configuração Inicial

Para começar a usar este projeto, siga as instruções abaixo.

### Pré-requisitos

- Node.js
- npm (geralmente vem com o Node.js)
- MongoDB
- PostgreSQL
- Redis

### Configuração do Ambiente

1. **Clonar o Repositório**

    ```bash
    git clone https://github.com/SchafNunes/bancoFinal.git
    cd bancoFinal
    ```

2. **Criar Arquivo `.env`**

    Na raiz do projeto, crie um arquivo `.env` com as seguintes variáveis de ambiente:

    ```
    REDIS_HOST=
    REDIS_PORT=
    REDIS_DB=
    MONGO_CONNECTION_STRING=
    DATABASE_URL=
    ```

    Substitua os valores conforme necessário para corresponder ao seu ambiente de desenvolvimento.

3. **Instalar Dependências**

    Execute o seguinte comando para instalar todas as dependências necessárias:

    ```bash
    npm install
    ```

### Configuração do Banco de Dados com Prisma

Para configurar o banco de dados:

1. **Executar Migrações do Prisma**

    Após configurar a `DATABASE_URL` no seu arquivo `.env`, execute as migrações do Prisma para configurar o seu banco de dados:

    ```bash
    npx prisma migrate dev
    ```

    Este comando irá aplicar as migrações do banco de dados e gerar o cliente Prisma.

2. **Gerar o Cliente Prisma**

    Para gerar o cliente Prisma com base no seu esquema, execute:

    ```bash
    npx prisma generate
    ```

### Executando o Projeto

Para iniciar o projeto, execute:

```bash
npm start
