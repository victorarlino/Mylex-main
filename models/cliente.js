const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("Cliente", clienteSchema);
