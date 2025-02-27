const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros']
    },
    value:{
        type: Number,
        required: true,
        min: 0
    },
    date:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Expense', expenseSchema)