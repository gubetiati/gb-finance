import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error('Erro na configuração da requisição: ', error)
        return Promise.reject(error)
    }
)

// interceptor para tratar respostas e erros
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Log detalhado do erro
        console.error('Erro na requisição:', {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        })

        if (!error.response) {
            // Erro de conexão (servidor não respondeu)
            return Promise.reject({
                success: false,
                message: 'Não foi possível conectar ao servidor. Verifique se o servidor está rodando.'
            })
        }

        if (error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
            return Promise.reject({
                success: false,
                message: 'Sessão expirada. Por favor, faça o login novamente'
            })
        }

        // Retorna a mensagem de erro do servidor ou uma mensagem padrão
        return Promise.reject({
            success: false,
            message: error.response.data?.message || 'Erro na requisição ao servidor'
        })
    }
)

export default api
