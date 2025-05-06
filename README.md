# GB Finance - Sistema de Gerenciamento Financeiro

GB Finance é uma aplicação web moderna para gerenciamento de despesas e finanças pessoais, desenvolvida com React no frontend e Node.js/Express no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- React
- Vite
- ESLint
- React Router DOM
- Axios
- Context API para gerenciamento de estado
- CSS Modules para estilização

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT para autenticação
- CORS
- Middleware de autenticação

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB Atlas (conta gratuita)
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gubetiati/gb-finance.git
cd gb-finance
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Instale as dependências do frontend:
```bash
cd ../frontend
npm install
```

4. Configure as variáveis de ambiente:
   - No diretório `backend`, crie um arquivo `.env` com as seguintes variáveis:
   ```
   MONGODB_URI=sua_string_de_conexao_mongodb
   PORT=5000
   JWT_SECRET=seu_jwt_secret
   ```

## 🚀 Executando o Projeto

1. Inicie o backend:
```bash
cd backend
npm start
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:5000`.

## 📁 Estrutura do Projeto

```
gb-finance/
├── backend/
│   ├── src/
│   │   ├── routes/         # Rotas da API
│   │   ├── models/         # Modelos do MongoDB
│   │   ├── middleware/     # Middlewares (auth, etc)
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # Componentes React reutilizáveis
    │   ├── contexts/       # Contextos React
    │   ├── services/       # Serviços de API
    │   ├── assets/         # Recursos estáticos
    ├── public/
    └── package.json
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. As rotas protegidas requerem um token válido no header das requisições. O token é armazenado no localStorage do navegador e gerenciado através do Context API do React.

## 📝 Funcionalidades

- Registro e login de usuários
- Gerenciamento de despesas
- Categorização de gastos
- Dashboard com visualizações
- Histórico de transações
- Relatórios financeiros
- Proteção de rotas no frontend e backend
- Gerenciamento de estado com Context API

## 🔒 Segurança

- Autenticação JWT
- Proteção contra CSRF
- Validação de dados
- Sanitização de inputs
- Rotas protegidas no backend
- Middleware de autenticação

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Autores

- Gustavo Betiati Ferreira - [@gubetiati](https://github.com/gubetiati)

## 🙏 Agradecimentos

- MongoDB Atlas pelo banco de dados
- Vite pela ferramenta de build
- React pela biblioteca frontend
- Node.js e Express pelo backend
