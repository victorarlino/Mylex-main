const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nomeCompleto: {
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
    processo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cliente', clienteSchema);
