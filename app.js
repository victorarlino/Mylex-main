// NPM Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Servir arquivos estáticos do diretório "public"
app.use(express.static(path.join(__dirname, "public")));

// Servir arquivos estáticos do diretório "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Config Import
const upload = require("./utils/uploadConfig");

// Route Imports
const advogadoRoutes = require("./routes/advogado");
const clienteRoutes = require('./routes/cliente');
const homepageRoutes = require("./routes/homepage");
const calendarRoutes = require("./routes/calendar");
const processoRouter = require('./routes/processos');

// Config Import
const config = require("./config");

// Port Config
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(config.db.connection)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

// Use Routes
app.use("/", advogadoRoutes);
app.use("/cliente", clienteRoutes);
app.use(homepageRoutes);
app.use('/processos', processoRouter);
app.use("/calendar", calendarRoutes);

// Rota para lidar com upload de arquivos
app.post("/upload", upload.single("file"), (req, res) => {
  // Lógica para manipular o upload de arquivos
  res.send("Arquivo enviado com sucesso!");
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
