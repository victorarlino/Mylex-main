const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Advogado = require("../models/advogado");
const verifyToken = require("../middlewares/authMiddleware"); 

const secret = "your_jwt_secret"; 

// Rota de Registro
router.post("/register", async (req, res) => {
  try {
    const {
      nomeCompleto,
      razaoSocial,
      emailCorporativo,
      senha,
      cnpj,
      cna,
      telefone,
    } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const advogado = new Advogado({
      nomeCompleto,
      razaoSocial,
      emailCorporativo,
      senha: hashedPassword,
      cnpj,
      cna,
      telefone,
    });
    await advogado.save();
    res.status(201).send(advogado);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota de Login
router.post("/login", async (req, res) => {
  try {
    const { emailCorporativo, senha } = req.body;
    const advogado = await Advogado.findOne({ emailCorporativo });
    if (!advogado) {
      return res.status(404).send("Advogado não encontrado");
    }
    const isPasswordValid = await bcrypt.compare(senha, advogado.senha);
    if (!isPasswordValid) {
      return res.status(401).send("Senha incorreta");
    }
    const token = jwt.sign({ id: advogado._id }, secret, {
      expiresIn: 86400, // 24 horas
    });
    res.send({ auth: true, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// rota de Logout
router.get("/logout", (req, res) => {
  // Limpar o cookie do token JWT
  res.clearCookie("token");
  // Redirecionar para a tela de login
  res.redirect("../public/login.html"); 
});



// Rotas Protegidas para Advogados
router.get("/get", verifyToken, async (req, res) => {
  try {
    const advogados = await Advogado.find();
    res.send(advogados);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const advogado = await Advogado.findByIdAndRemove(req.params.id);
    res.send(advogado);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const {
      nomeCompleto,
      razaoSocial,
      emailCorporativo,
      senha,
      cnpj,
      cna,
      telefone,
    } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const advogado = await Advogado.findByIdAndUpdate(
      req.params.id,
      {
        nomeCompleto,
        razaoSocial,
        emailCorporativo,
        senha: hashedPassword,
        cnpj,
        cna,
        telefone,
      },
      { new: true }
    );
    res.send(advogado);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
