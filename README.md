## 💥 Gobarber | Gostack 11

A aplicação segue permitindo gerenciar usuários administradores, clientes, agendamentos e outras funcionalidades em um ambiente de barbearia.

Foram aplicados padrões de arquitetura e boas práticas de programação como **DDD**, **SOLID**, **Service Pattern** e **Repository Pattern**. Durante todo o desenvolvimento foi utilizado **TDD** com a ferramenta *Jest*.

## Índice
- 🚀 [Funcionalidades](#-funcionalidades)
- ⚙ [Tecnologias utilizadas](#-tecnologias)
- 💻 [Instruções para o back end](#-instruções-para-o-back-end)
- 💻 [Instruções para o front end](#-instruções-para-o-front-end)
- 📱 [Instruções para o mobile](#-instruções-para-o-mobile)
- 🐞 [Executandos testes](#-executando-testes)
- 📸 [Interfaces da aplicação](#-interfaces-da-aplicação)

---

## 🚀 Funcionalidades
- Cadastro de usuário
  - **Requisitos Funcionais**
    - O usuário deve poder se cadastrar utilizando nome, email e senha;

  - **Requisitos Não-Funcionais**
    - A senha deve ser armazenada criptografada;

- Login de usuário
  - **Requisitos Funcionais**
    - O usuário deve poder logar utilizando email e senha;

- Recuperação de senha
  - **Requisitos Funcionais**
    - O usuário deve poder recuperar sua senha informando o seu e-mail;
    - O usuário deve receber um e-mail com instruções de recuperação de senha;
    - O usuário deve poder resetar sua senha

  - **Requisitos Não-Funcionais**
    - Utilizar Mailtrap (ethereal) para testar envios em ambiente de desenvolvimento;
    - Utilizar Amazon SES para envios em produção;
    - O envio de e-mails deve acontecer em segundo plano (background job);

  - **Regras de Negócios**
    - O link enviado por e-mail para resetar a senha deve expirar em 2h;
    - O usuário precisa confirmar a nova senha ao resetar;

- Atualização do perfil
  - **Requisitos Funcionais**
    - O usuário deve poder atualizar seu nome, e-mail e senha

  - **Regras de Negócios**
    - O usuário não pode alterar seu e-mail para um já utilizado por outro usuário;
    - Para atualizar sua senha, o usuário deve informar a senha antiga;

- Painel do prestador
  - **Requisitos Funcionais**
    - O usuário deve poder listar seus agendamentos de um dia específico;
    - O prestador deve receber uma notificação sempre que houver um novo agendamento;
    - O prestador deve poder visualizar as notificações não lidas;

  - **Requisitos Não-Funcionais**
    - Os agendamentos do prestador no dia devem ser armazenados em cache;
    - As notificações do prestador devem ser armazenadas no MongoDB;
    - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

  - **Regras de Negócios**
    - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

- Agendamento de serviços
  - **Requisitos Funcionais**
    - O usuário deve poder listar todos os prestadores de serviços cadastrados;
    - O usuário deve poder listar os dias, com pelo menos um horário disponível, de um prestador em um mês específico;
    - O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
    - O usuário deve poder realizar um novo agendamento com um prestador;

  - **Requisitos Não-Funcionais**
    - A listagem de prestadores deve ser armazenada em cache;

  - **Regras de Negócios**
    - Cada agendamento deve duar 1h exatamente;
    - Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h e último às 17h);
    - O usuário não pode agendar em um horário já ocupado;
    - O usuário não pode agendar em um horário que já passou;
    - O usuário não pode agendar serviços consigo mesmo;
---

## ⚙ Tecnologias
  - **Back end**
    - nodeJS
    - express
    - typescript
    - typeorm
    - postgres
    - mongodb
    - redis
    - uuidv4
    - date-fns
    - multer
    - celebrate/joi
    - dotenv
    - class-transformer
    - jest/ts-jest
    - rate-limiter-flexible
    - Amazon SES
    - Amazon S3

  - **Outras tecnologias**
    - Docker

---

> Inicialmente precisamos clonar o repositório para ter acesso a todas as pastas
```bash
  # Clonando repositório
  git clone https://github.com/AugustoMarcelo/gobarber.git
```

## 💻 Instruções para o back end

  Começaremos criando as instâncias dos nossos bancos de dados. Para esse projeto, o **docker** foi utilizado. Abaixo, seguem os comandos para criar os containers e inicializar as instâncias:

  ```bash
    # Criando container com instância do postgres
    docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

    # Criando container com instância do mongo
    docker run --name mongodb -p 27017:27017 -d -t mongo

    # Criando container com instância do redis
    docker run --name redis -p 6379:6379 -d -t redis:alpine

    # Inicializando as instâncias
    docker start postgres mongodb redis
  ```

  Primeiramente, você precisará criar um arquivo contendo as informações de acesso ao seu banco de dados. Esta aplicação foi desenvolvida utilizando o **Postgres** e **MongoDB**. Crie um arquivo chamado *ormconfig.json* na pasta `backend` e preencha conforme o arquivo-modelo *ormconfig.example.json*. Lembre-se, antes de rodar as migrations, criar o banco de dados e informar o nome da sua base no arquivo *ormconfig.json*.

  ```bash
    # Acessar a pasta do back end
    cd backend

    # Baixar as dependências
    yarn

    # Executar as migrations
    yarn typeorm migration:run

    # Inicializar o servidor de desenvolvimento
    yarn dev:server
  ```

  Será necessário criar também um arquivo *.env*, que conterá as variáveis de ambiente. Use *.env.example* como modelo.

---

## 🐞 Executando testes

  ```bash
    yarn test
  ```


