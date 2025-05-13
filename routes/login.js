const express = require('express');
const router = express.Router();
const Login = require("../models/login");

router.get('/login', async (req, res) => {
  try {
    const { user, password } = req.query; // Obter os parâmetros da URL

    // Buscar o usuário no banco de dados
    const login = await Login.findOne({ user });

    if (!login) {
      // Usuário não encontrado
      return res.status(401).send({ error: 'Usuário não encontrado' });
    }

    // Comparar a senha
    if (login.password !== password) {
      // Senha incorreta
      return res.status(401).send({ error: 'Senha incorreta' });
    }

    // Autenticação bem-sucedida
    return res.status(200).send({ message: 'Autenticação bem-sucedida' });
  } catch (error) {
    // Erro ao processar a requisição
    return res.status(500).send({ error: 'Erro ao realizar login' });
  }
});

// Rota para obter todos os logins
router.get("/", async (req, res) => {
  try {
    const logins = await Login.find();
    return res.send(logins);
  } catch (error) {
    return res.status(500).send({ error: "Erro ao buscar logins" });
  }
});

// Rota para criar um novo login
router.post("/", async (req, res) => {
  try {
    // Obter o primeiro objeto dentro do array "login"
    const { user, password } = req.body;

    // Criar um novo objeto Login com os dados do objeto "newLogin"
    const login = new Login({user, password });

    await login.save();
    return res.send(login); 
  } catch (error) {
    return res.status(500).send({ error: "Erro ao criar login" });
  }
});

// Rota para obter um login por ID
router.get("/:id", async (req, res) => {
  try {
    const login = await Login.findById(req.params.id);
    if (!login) {
      return res.status(404).send({ error: "Login não encontrado" });
    }
    return res.send(login);
  } catch (error) {
    return res.status(500).send({ error: "Erro ao buscar login" });
  }
});

// Rota para atualizar um login por ID
router.put("/:id", async (req, res) => {
  try {
    const { user, password } = req.body;
    const login = await Login.findById(req.params.id);
    if (!login) {
      return res.status(404).send({ error: "Login não encontrado" });
    }
    login.user = user;
    login.password = password;
    await login.save();
    return res.send(login);
  } catch (error) {
    return res.status(500).send({ error: "Erro ao atualizar login" });
  }
});

// Rota para deletar um login por ID
router.delete("/:id", async (req, res) => {
  try {
    const login = await Login.findByIdAndDelete(req.params.id);
    if (!login) {
      return res.status(404).send({ error: "Login não encontrado" });
    }
    return res.send(login);
  } catch (error) {
    return res.status(500).send({ error: "Erro ao deletar login" });
  }
});

module.exports = router;