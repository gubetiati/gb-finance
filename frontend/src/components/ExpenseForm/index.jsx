import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { expenseService } from '../../services/expenses'
import './ExpenseForm.css'

export default function ExpenseForm() {
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const categories= [
        'Alimentação',
        'Transporte',
        'Moradia',
        'Lazer',
        'Saúde',
        'Educação',
        'Outros'
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try{
            if(!category || !value || !date){
                setError('Por favor, preencha todos os campos obrigatórios!')
                return
            }
            
            const numericValue = parseFloat(value)
            if (isNaN(numericValue) || numericValue <= 0){
                setError('Por favor, insira um valor válido maior que zero!')
                return
            }
    
            const expenseData = {
                category,
                value: numericValue,
                date: new Date(date).toISOString(),
                description: description.trim()
            }
    
            const result = await expenseService.create(expenseData)
    
            if (result.success){
                setSuccess('Despesa registrada com sucesso')
                setCategory('')
                setValue('')
                setDate('')
                setDescription('')
    
                setTimeout(() => {
                    navigate('/dashboard')
                }, 2000)
            } else{
                setError(result.message)
            }
        } catch (error) {
            console.error('Erro ao criar despesa:', error)
            setError('Ocorreu um erro ao registrar a despesa. Tente novamente')
        }
    }

    return(
        <div className="container-principal">
            <h1 className="titulo">Registrar despesa</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit} className="form-style">

                <label htmlFor="category">Categoria</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <label htmlFor="value">Valor (R$)</label>
                <input
                    type="number"
                    id="value"
                    placeholder="0,00"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                />

                <label htmlFor="date">Data</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <label htmlFor="description">Descrição (opcional)</label>
                <textarea
                    id="description"
                    placeholder="Adicione uma descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />

                <div className="form-buttons">
                    <button type="submit">Registrar Despesa</button>
                    <button type="button" onClick={() => navigate('/dashboard')} className="cancel-button">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )

}