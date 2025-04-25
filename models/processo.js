const mongoose = require("mongoose");

const processoSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  descricao: { type: String },
  status: { type: String, enum: ["ativo", "em andamento", "concluído"], default: "em andamento" },
  dataCriacao: { type: Date, default: Date.now },
  advogado: { type: mongoose.Schema.Types.ObjectId, ref: "Advogado", required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Processo", processoSchema);
