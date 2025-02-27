import './LoginForm.css'
import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm () { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const result = await login(email, password)
        if (result.success){
            navigate('/dashboard')
        } else{
            setError(result.message)
        }
    }

    return(
        <div className='container-principal'>
            <h1 className='titulo'>Login</h1>
            {error && <p className='error-message'>{error}</p>}

            <form onSubmit={handleSubmit} className='form-style'>

                <label htmlFor="email">E-mail</label>
                <input
                    type='email'
                    id='email'
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Senha</label>
                <input
                    type='password'
                    id='password'
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Entrar</button>
            </form>

            <div className='register-link'>
                <p>Não tem uma conta?</p>
                <Link to='/register'>Cadastre-se aqui</Link>
            </div>
        </div>
    )
}
