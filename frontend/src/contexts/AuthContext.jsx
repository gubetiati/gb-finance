import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if(storedUser && token){
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try{
            console.log('Tentando fazer login com:', { email })
            const response = await api.post('/auth/login', { email, password })
            console.log('Resposta do servidor:', response.data)
            
            const { user, token } = response.data

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            setUser(user)

            return { success: true }
        } catch(error){
            console.error('Erro detalhado no login:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            })
            
            if (error.response?.data?.message) {
                return {
                    success: false,
                    message: error.response.data.message
                }
            }
            
            return {
                success: false,
                message: 'Erro ao fazer login. Verifique suas credenciais.'
            }
        }
    }

    const register = async (name, email, password) => {
        try{
            const response = await api.post('/auth/register', {
                name,
                email,
                password
            })
            const { user, token } = response.data

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            setUser(user)

            return { success: true }
        } catch(error){
            return{
                success: false,
                message: error.response?.data?.message || 'Erro ao registrar usuário'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }

    if(loading){
        return <div>Carregando...</div>
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}