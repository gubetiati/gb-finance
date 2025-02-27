const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// registo de usuário
router.post('/register', async (req, res) => {
    try{
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })
        if(userExists){
            return res.status(400).json({ message: 'Este e-mail já está em uso '})
        }

        // criar novo usuário
        const user = await User.create({
            name,
            email,
            password
        })

        // gerar token
        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        )

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error){
        return res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message })
    }
})

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({ message: 'E-mail ou senha inválidos' })
        }

        // verificar senha
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ message: 'E-mail ou senha inválidos' })
        }

        // gerar token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error){
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message})
    }
})

module.exports = router