# API de Gerenciamento de Clientes

Esta API foi desenvolvida para gerenciar clientes, permitindo operações como criar, listar, atualizar e excluir clientes.

## Tecnologias Utilizadas

- **Node.js:** Plataforma de desenvolvimento backend.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar os dados dos clientes e agentes.
- **React/Next.js:** Framework utilizado para construir a interface do usuário.

## Recursos Disponíveis

- **Clientes:** Representa os clientes cadastrados no sistema.
- **Agentes:** Representa os agentes responsáveis pelos clientes.

## Postman 
Acesse a coleção do Postman: REST API Intra Social.postman_collection.json

## Endpoints

### Clientes

- **GET /client:** Retorna todos os clientes cadastrados.
- **GET /client/{id}:** Retorna um cliente específico pelo ID.
- **POST /client:** Cria um novo cliente.
- **PUT /client/{id}:** Atualiza um cliente existente.
- **DELETE /client/{id}:** Exclui um cliente pelo ID.

### Agentes

- **GET /agent:** Retorna todos os agentes cadastrados.
- **GET /agent/{id}:** Retorna um agente específico pelo ID.
- **POST /agent:** Cria um novo agente.
- **PUT /agent/{id}:** Atualiza um agente existente.
- **DELETE /agent/{id}:** Exclui um agente pelo ID.

## Parâmetros de Consulta

- **status:** Filtra os clientes por status (opcional).
- **agenteNome:** Filtra os clientes por nome do agente (opcional).
- **dataInicio:** Filtra os clientes por data de início (opcional).
- **dataFim:** Filtra os clientes por data de término (opcional).

## Exemplo de Requisição

```http
GET /api/clientes?status=Vendido&agenteId=123&dataInicio=2024-01-01&dataFim=2024-05-01

[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "123456789",
    "endereco": "Rua A, 123",
    "status": "Vendido",
    "valor": 1500.00,
    "agente": {
      "id": 123,
      "nome": "Maria"
    },
    "dataCadastro": "2024-04-01T10:00:00Z",
    "updatedAt": "2024-05-01T15:30:00Z"
  },
  {
    "id": 2,
    "nome": "Maria Souza",
    "email": "maria@example.com",
    "telefone": "987654321",
    "endereco": "Rua B, 456",
    "status": "Em Atendimento",
    "valor": null,
    "agente": {
      "id": 456,
      "nome": "João"
    },
    "dataCadastro": "2024-04-15T09:30:00Z",
    "updatedAt": "2024-05-10T11:45:00Z"
  }
]
