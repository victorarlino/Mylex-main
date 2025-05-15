
const mongoose = require('mongoose');

const ProcessoSchema = new mongoose.Schema({
    arquivo: { type: String, required: false },
    categoria: { type: String, required: true },
    status: { type: String, required: true },
    notas: { type: String },
    cliente: { type: String, required: true }
});

module.exports = mongoose.model('Processo', ProcessoSchema);
