const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgenteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Ativo", "Inativo"],
        default: "Ativo"
    }
});

module.exports = mongoose.model('Agente', AgenteSchema);
