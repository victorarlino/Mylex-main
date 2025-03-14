const express = require('express');
const router = express.Router();
const Processo = require('../models/processo');
const upload = require('../utils/uploadConfig');

// Rota para obter todos os processos
router.get('/', async (req, res) => {
    try {
        const processos = await Processo.find();
        return res.send(processos);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao buscar processos' });
    }
});

// Rota para obter um processo por ID
router.get('/:id', async (req, res) => {
    try {
        const processo = await Processo.findById(req.params.id);
        if (!processo) {
            return res.status(404).send({ error: 'Processo não encontrado' });
        }
        return res.send(processo);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao buscar processo' });
    }
});

// Rota para criar um novo processo com upload de arquivo
router.post('/', upload.single('arquivo'), async (req, res) => {
    try {
        const { categoria, status, cliente } = req.body;
        const arquivo = req.file ? req.file.path : null;
        const processo = new Processo({ arquivo, categoria, status, cliente });
        await processo.save();
        return res.send(processo);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao criar processo' });
    }
});

// Rota para atualizar um processo por ID com upload de arquivo opcional
router.put('/:id', upload.single('arquivo'), async (req, res) => {
    try {
        const { categoria, status, cliente } = req.body;
        const arquivo = req.file ? req.file.path : null;

        const processo = await Processo.findById(req.params.id);
        if (!processo) {
            return res.status(404).send({ error: 'Processo não encontrado' });
        }

        processo.categoria = categoria;
        processo.status = status;
        processo.cliente = cliente;
        if (arquivo) {
            processo.arquivo = arquivo;
        }

        await processo.save();
        return res.send(processo);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao atualizar processo' });
    }
});

// Rota para deletar um processo por ID
router.delete('/:id', async (req, res) => {
    try {
        const processo = await Processo.findByIdAndDelete(req.params.id);
        if (!processo) {
            return res.status(404).send({ error: 'Processo não encontrado' });
        }
        return res.send(processo);
    } catch (error) {
        return res.status(500).send({ error: 'Erro ao deletar processo' });
    }
});

module.exports = router;
