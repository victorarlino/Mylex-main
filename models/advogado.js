const mongoose = require("mongoose");

const advogadoSchema = new mongoose.Schema({
  nomeCompleto: String,
  razaoSocial: String,
  emailCorporativo: String,
  senha: String,
  cnpj: Number,
  cna: Number,
  telefone: Number
});

module.exports = mongoose.model("Advogado", advogadoSchema);
