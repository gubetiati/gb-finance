import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { expenseService } from '../../services/expenses'
import Relatorio from '../Relatorio'
import './Dashboard.css'

export default function Dashboard() {
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        loadExpenses()
    }, [selectedYear, selectedMonth])

    const loadExpenses = async () => {
        try{
            console.log('Token:', localStorage.getItem('token')) // Debug token
            console.log('Fazendo requisição para buscar despesas...') // Debug requisição
            const result = await expenseService.getAll()
            console.log('Resultado da requisição:', result) // Debug resultado
            if(result.success){
                setExpenses(result.data)
            } else {
                console.error('Erro ao carregar despesas:', result.message)
            }
        } catch (error){
            console.error('Erro ao carregar despesas:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleAddExpense = () => {
        navigate('/expenses/new')
    }

    const handleDeleteExpense = async (expenseId) => {
        if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
            try {
                const result = await expenseService.delete(expenseId)
                if (result.success) {
                    // Atualiza a lista de despesas removendo a despesa excluída
                    setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== expenseId))
                } else {
                    alert('Erro ao excluir despesa: ' + result.message)
                }
            } catch (error) {
                console.error('Erro ao excluir despesa:', error)
                alert('Erro ao excluir despesa. Tente novamente.')
            }
        }
    }

    // filtra as despesas pelo mês e ano selecionados
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date)
        return (
            expenseDate.getFullYear() === selectedYear &&
            expenseDate.getMonth() + 1 === selectedMonth
        )
    })

    // calcula o total de gastos do período
    const totalExpenses = filteredExpenses.reduce((total, expense) => total + expense.value, 0)

    // gera lista de anos (do ano atual até 3 anos atrás)
    const getYearOptions = () => {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let i = 0; i < 4; i++) {
            years.push(currentYear - i)
        }
        return years
    }

    // Lista de meses
    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' }
    ]

    if (loading) {
        return <div className="loading">Carregando...</div>
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="user-info">
                    <span>Bem-vindo, {user?.name}</span>
                    <button onClick={handleLogout} className="logout-button">
                        Sair
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="dashboard-controls">
                    <div className="date-selectors">
                        <div className="selector-group">
                            <label>Mês:</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                className="date-select"
                            >
                                {months.map(month => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="selector-group">
                            <label>Ano:</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="date-select"
                            >
                                {getYearOptions().map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="total-expenses">
                        <span>Total de gastos:</span>
                        <strong>R$ {totalExpenses.toFixed(2)}</strong>
                    </div>
                    <button onClick={handleAddExpense} className="add-expense-button">
                        Nova Despesa
                    </button>
                </div>

                <div className="expenses-list">
                    <h2>Suas Despesas</h2>
                    {filteredExpenses.length === 0 ? (
                        <p>Nenhuma despesa registrada em {months[selectedMonth - 1].label} de {selectedYear}.</p>
                    ) : (
                        <div className="expenses-list-container">
                            {filteredExpenses.map((expense) => (
                                <div key={expense._id} className="expense-item">
                                    <div className="expense-item-header">
                                        <h3>{expense.category}</h3>
                                        <div className="expense-item-actions">
                                            <p className="expense-value">
                                                R$ {expense.value.toFixed(2)}
                                            </p>
                                            <button 
                                                onClick={() => handleDeleteExpense(expense._id)}
                                                className="delete-button"
                                                aria-label="Excluir despesa"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="expense-item-details">
                                        <p className="expense-date">
                                            {new Date(expense.date).toLocaleDateString()}
                                        </p>
                                        {expense.description && (
                                            <p className="expense-description">{expense.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Relatorio expenses={filteredExpenses} />
            </main>
        </div>
    )
}