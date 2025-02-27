import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: '10000',
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
        if(error.response){
            console.error('Erro na resposta: ', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            })

            if(error.response.status === 401){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.href = '/login'
                return Promise.reject(new Error('Sessão expirada. Por favor, faça o login novamente'))
            }

            return Promise.reject(error.response.data)
        }

        if(error.request){
            console.error('Erro de conexão:', error.request)
            return Promise.reject(new Error('Erro de conexão com o servidor. Por favor, verifique sua internet'))
        }
        console.error('Erro:', error.message)
        return Promise.reject(error)
    }
)

export default api
