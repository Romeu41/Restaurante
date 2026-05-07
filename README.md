# Restaurante Management

Sistema completo de gerenciamento para restaurante com frontend Angular 18 e backend ASP.NET Core 8.

## Estrutura do projeto

- `/frontend` - aplicação Angular 18 com Angular Material, JWT e roteamento.
- `/backend` - API ASP.NET Core 8 com Entity Framework Core, JWT, Swagger e arquitetura em camadas.
- `/database` - scripts SQL iniciais.
- `/docker` - arquivos Docker e docker-compose.

## Requisitos

- Docker e Docker Compose
- .NET 8 SDK
- Node.js 20+
- SQL Server (opcional se usar Docker)

## Instalação e execução

### Usando Docker

1. Entre na pasta do projeto:

```bash
cd /workspace/restaurant-management
```

2. Execute:

```bash
docker-compose up --build
```

3. Acesse:

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:5000/swagger`

### Manual

#### Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Banco de dados

O backend está configurado para usar SQL Server.
No Docker Compose, o serviço `sqlserver` é usado automaticamente.

Se precisar configurar manualmente, atualize `backend/appsettings.json` com a string de conexão correta.

## Migrations

No backend:

```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Swagger

`http://localhost:5000/swagger`

## Observações

- O backend inclui autenticação JWT, validação global e logs.
- O frontend possui interceptors, guards e módulos organizados.
- O projeto foi estruturado pensando em ambiente de produção e facilidade de manutenção.
