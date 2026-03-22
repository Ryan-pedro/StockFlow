# StockFlow 

Sistema de controle de inventário desenvolvido como projeto de portfólio.

##  Tecnologias

**Backend**
- C# / .NET 8
- ASP.NET Core Web API
- Entity Framework Core 8
- SQL Server 2022
- MediatR (CQRS)
- FluentValidation
- AutoMapper
- Swagger / OpenAPI

**Frontend**
- Angular 17+
- TypeScript
- Angular Material

##  Arquitetura

Clean Architecture + CQRS + Repository Pattern + SOLID

## Como rodar

### Pré-requisitos
- .NET 8 SDK
- SQL Server 2022
- Node.js 18+

### Backend
```bash
cd src/StockFlow.API
dotnet run
```

Swagger disponível em: `https://localhost:7000/swagger`

### Banco de dados
```bash
dotnet ef database update --project src/StockFlow.Infrastructure --startup-project src/StockFlow.API
```

##  Estrutura
```
StockFlow/
├── src/
│   ├── StockFlow.Domain/         # Entidades e regras de negócio
│   ├── StockFlow.Application/    # CQRS — Commands e Queries
│   ├── StockFlow.Infrastructure/ # EF Core, repositórios
│   └── StockFlow.API/            # Controllers e Swagger
└── stockflow-frontend/           # Angular (em desenvolvimento)
```
