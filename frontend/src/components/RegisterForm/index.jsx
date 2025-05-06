import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './RegisterForm.css'

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('As senhas não coincidem')
            return
        }

        const result = await register(name, email, password)
        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.message)
        }
    }

    const handleBack = () => {
        navigate('/login')
    }

    return (
        <div className='container-principal'>
            <button className="back-button" onClick={handleBack}>
                ←
            </button>
            <h1 className='titulo'>Cadastro</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className='form-style'>
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />

                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}