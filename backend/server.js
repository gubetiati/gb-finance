const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./src/routes/auth')
const expenseRoutes = require( './src/routes/expenses')
require('dotenv').config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err))

// rotas
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})