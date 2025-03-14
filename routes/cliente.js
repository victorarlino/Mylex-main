const express = require('express');
const router = express.Router();
const Cliente = require("../models/cliente");

// Rota para obter todos os clientes
router.get('/', async (req, res) => {
    const clientes = await Cliente.find();
    return res.send(clientes);
});

// Rota para obter um cliente por ID
router.get('/:id', async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
        return res.status(404).send({ error: 'Cliente não encontrado' });
    }
    return res.send(cliente);
});

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    console.log('chamou')
    const { nomeCompleto, email, telefone, processo } = req.body;
    const cliente = new Cliente({ nomeCompleto, email, telefone, processo });
    await cliente.save();
    return res.send(cliente);
});

// Rota para atualizar um cliente por ID
router.put('/:id', async (req, res) => {
    const { nomeCompleto, email, telefone, processo } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, { nomeCompleto, email, telefone, processo }, { new: true });
    if (!cliente) {
        return res.status(404).send({ error: 'Cliente não encontrado' });
    }
    return res.send(cliente);
});

// Rota para deletar um cliente por ID
router.delete('/:id', async (req, res) => {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
        return res.status(404).send({ error: 'Cliente não encontrado' });
    }
    return res.send(cliente);
});

module.exports = router;
