import './LoginForm.css'
import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm () { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        console.log('Iniciando tentativa de login...')

        try {
            const result = await login(email, password)
            console.log('Resultado do login:', result)
            
            if (result.success){
                console.log('Login bem sucedido, redirecionando...')
                navigate('/dashboard')
            } else {
                console.error('Erro no login:', result.message)
                setError(result.message)
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error)
            setError(error.message || 'Erro ao tentar fazer login. Por favor, tente novamente.')
        } finally {
            setIsLoading(false)
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
                    disabled={isLoading}
                />

                <label htmlFor="password">Senha</label>
                <input
                    type='password'
                    id='password'
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <div className='register-link'>
                <p>Não tem uma conta?</p>
                <Link to='/register'>Cadastre-se aqui</Link>
            </div>
        </div>
    )
}
