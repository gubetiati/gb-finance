const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        // verificar header de autorização
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({ message: 'Token não fornecido' })
        }

        // formato do token: Bearer <token>
        const parts = authHeader.split(' ')
        if(parts.length !== 2) {
            return res.status(401).json({ message: 'Token mal formatado' })
        }

        const [scheme, token] = parts
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: 'Token mal formatado' })
        }

        // verificar token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                return res.status(401).json({ message: 'Token inválido' })
            }
            req.userId = decoded.userId
            return next()
        })

    } catch(error){
        return res.status(500).json({ message: 'Erro na autenticação', error: error.message})
    }

}