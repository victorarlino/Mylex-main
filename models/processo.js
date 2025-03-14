const mongoose = require('mongoose');

const ProcessoSchema = new mongoose.Schema({
    arquivo: { type: String, required: true },
    categoria: { type: String, required: true },
    status: { type: String, required: true },
    cliente: { type: String, required: true }
});

module.exports = mongoose.model('Processo', ProcessoSchema);