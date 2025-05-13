const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nomeCompleto: String,
  cpf : String,
  email : String,
  telefone : String,
  endereco : String

}, { collection: 'Cliente' });

module.exports = mongoose.model('Cliente',ClienteSchema);
