# Restaurante Management

Sistema de gerenciamento para restaurante com frontend Angular 18 e backend ASP.NET Core 8.

## Estrutura do projeto

- `/frontend` - aplicação Angular 18 com Angular Material, JWT, autenticação e módulos organizados.
- `/backend` - API ASP.NET Core 8 com Entity Framework Core, JWT e arquitetura em camadas.
- `/database` - scripts SQL iniciais.
- `/docker` - Dockerfiles e `docker-compose.yml`.

## Funcionalidades principais

- Autenticação por login e cadastro de usuário.
- Dashboard com resumo de clientes, estoque e itens faltando.
- Cadastro de clientes com lista de clientes registrados.
- Registro de estoque (entrada/saída) com histórico de movimentações.
- Registro de vendas com múltiplos itens e cálculo do total.

## Requisitos

- Docker e Docker Compose
- .NET 8 SDK
- Node.js 20+

## Execução rápida

### Com Docker

```bash
cd c:/workspace/restaurant-management
docker-compose up --build
```

Acesse:

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:5000/swagger`

### Manualmente

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

## Uso

- Faça login ou cadastre uma nova conta.
- Use o dashboard para acessar rapidamente:
  - Registrar venda
  - Registrar produto no estoque
  - Cadastrar cliente
- As telas salvam dados localmente para clientes, estoque e pedidos.

## Observações

- O backend usa JWT e está preparado para uso com SQL Server.
- Caso use Docker, o `docker-compose.yml` já monta as aplicações e o banco.
- Atualize `backend/appsettings.json` se houver necessidade de configurar outra string de conexão.
