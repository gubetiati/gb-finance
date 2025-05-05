import './Relatorio.css'

export default function Relatorio({ expenses }) {
    // Agrupa as despesas por categoria
    const expensesByCategory = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0
        }
        acc[expense.category] += expense.value
        return acc
    }, {})

    // Calcula o total de despesas
    const totalExpenses = Object.values(expensesByCategory).reduce((total, value) => total + value, 0)

    // Encontra a categoria com maior gasto
    const highestExpenseCategory = Object.entries(expensesByCategory).reduce((max, [category, value]) => {
        return value > max.value ? { category, value } : max
    }, { category: '', value: 0 })

    return (
        <div className="relatorio-container">
            <h2>Relatório de Despesas</h2>
            <div className="relatorio-content">
                <div className="relatorio-summary">
                    <div className="summary-item">
                        <span className="label">Total de Despesas:</span>
                        <span className="value">R$ {totalExpenses.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Categoria com Maior Gasto:</span>
                        <span className="value">{highestExpenseCategory.category}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Valor do Maior Gasto:</span>
                        <span className="value">R$ {highestExpenseCategory.value.toFixed(2)}</span>
                    </div>
                </div>
                <div className="relatorio-categories">
                    <h3>Gastos por Categoria</h3>
                    <div className="categories-list">
                        {Object.entries(expensesByCategory).map(([category, value]) => (
                            <div key={category} className="category-item">
                                <span className="category-name">{category}</span>
                                <span className="category-value">R$ {value.toFixed(2)}</span>
                                <div className="category-bar">
                                    <div 
                                        className="category-bar-fill"
                                        style={{ width: `${(value / totalExpenses) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
