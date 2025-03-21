const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Conexão com MongoDB
mongoose.connect('mongodb+srv://victorduartearlino2210:MAANcRaI2M5O5Q1L@cluster0.6ydf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

// Definição do Modelo no Mongoose
const Adv = mongoose.model('fil', { 
  title: String,
  description: String,
  image_url: String,
  trailer_url: String
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Config Import
const upload = require("./utils/uploadConfig");

// Importação de Rotas
const advogadoRoutes = require("./routes/advogado");
const clienteRoutes = require("./routes/cliente");
const homepageRoutes = require("./routes/homepage");
const calendarRoutes = require("./routes/calendar");
const processoRouter = require("./routes/processos");

// Configuração do Servidor
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Uso de Rotas
app.use("/", advogadoRoutes);
app.use("/cliente", clienteRoutes);
app.use(homepageRoutes);
app.use("/processos", processoRouter);
app.use("/calendar", calendarRoutes);

// Rota para Upload de Arquivos
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Arquivo enviado com sucesso!");
});

// Rota para Criar um Novo Documento no MongoDB
app.post("/", async (req, res) => {
  try {
    const newAdv = new Adv({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url
    });

    await newAdv.save();
    res.status(201).json(newAdv);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar no banco de dados", details: error.message });
  }
});

// Iniciando o Servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
