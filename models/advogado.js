

const mongoose = require("mongoose");

const advogadoSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  razaoSocial: { type: String, required: true },
  emailCorporativo: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cnpj: { type: String, required: true },
  cna: { type: String, required: true },
  telefone: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Advogado", advogadoSchema);
