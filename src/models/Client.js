const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Aguardando Atendimento', 'Em Atendimento', 'Proposta Feita', 'Não Concluído', 'Vendido'],
        default: 'Aguardando Atendimento'
    },
    valor: {
        type: Number,
        default: null
    },
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agente',
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', ClienteSchema);
