const router = require('express').Router()
const auth = require('../middleware/auth')
const Expense = require('../models/Expense')

// criar nova despesa
router.post('/', auth, async (req, res) => {
    try{
        const { category, value, date, description } = req.body

        const expense = await Expense.create({
            user: req.userId,
            category,
            value,
            date,
            description
        })
        res.status(201).json(expense)
    } catch (error){ 
        res.status(500).json({ message: 'Erro ao criar despesa', error: error.message})
    }
})

// listar todas as despesas do usuário
router.get('/', auth, async (req, res) => {
    try{
        const expenses = await Expense.find({ user: req.userId })
            .sort({ date: -1 })

        res.json(expenses)
    } catch(error){
        res.status(500).json({ message: 'Erro ao buscar despesas', error: error.message})
    }
})

// buscar uma despesa específica
router.get('/:id', auth, async (req, res) => {
    try{
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.userId
        })

        if(!expense){
            return res.status(404).json({ message: 'Despesa não encontrada' })
        }
        res.json(expense)
    } catch (error){
        res.status(500).json({ message: 'Erro ao buscar despesa', error: error.message })
    }
})

// atualizar uma despesa
router.put('/:id', auth, async (req, res) => {
    try{
        const { category, value, date, description } = req.body

        const expense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                category,
                value,
                date,
                description
            },
            { new: true }
        )

        if(!expense){
            return res.status(404).json({ message: 'Despesa não encontrada' })
        }
        res.json(expense)
    } catch(error){
        res.status(500).json({ message: 'Erro ao atualizar despesa', error: error.message})
    }
})

// deletar uma despesa
router.delete('/:id', auth, async (req, res) => {
    try{
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        })
    
        if(!expense){
            return res.status(404).json({ message: 'Despesa não encontrada' })
        }
    
        res.json({ message: 'Despesa deletada com sucesso' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar despesa', error: error.message })
    }
})

module.exports = router
