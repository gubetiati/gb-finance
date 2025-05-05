import api from './api'

export const expenseService = {
    // listar todas as despesas
    getAll: async () => {
        try{
            const response = await api.get('/expenses')
            return { success: true, data: response.data }
        } catch (error) {
            return{
                success: false,
                message: error.response?.data?.message || 'Erro ao buscar despesas'
            }
        }
    },

    // buscar uma despesa específica
    getById: async (id) => {
        try{
            const response = await api.get(`/expenses/${id}`)
            return { success: true, data: response.data}
        } catch (error) {
            return{
                success: false,
                message: error.response?.data?.message || 'Erro ao buscar despesa'
            }
        }
    },

    // criar nova despesa
    create: async (expenseData) => {
        try{
            const response = await api.post('/expenses', expenseData)
            return { success: true, data: response.data }
        } catch (error){
            return {
                success: false,
                message: error.response?.data?.message || 'Erro ao criar despesa'
            }
        }
    },

    update: async (id, expenseData) => {
        try{
            const response = await api.put(`/expenses/${id}`, expenseData)
            return { success: true, data: response.data }
        } catch(error){
            return{
                success: false,
                message: error.response?.data?.message || 'Erro ao atualizar despesa'
            }
        }
    },

    // deletar despesa
    delete: async (id) => {
        try {
            await api.delete(`/expenses/${id}`)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Erro ao excluir despesa'
            }
        }
    }
}