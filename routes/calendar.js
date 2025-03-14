const express = require('express');
const router = express.Router();
const Event = require("../models/event");

// Rota para obter todos os eventos
router.get('/', async (req, res) => {
    const events = await Event.find();
    return res.send(events);
});

// Rota para obter um evento por ID
router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        return res.status(404).send({ error: 'Evento não encontrado' });
    }
    return res.send(event);
});

// Rota para criar um novo evento
router.post('/', async (req, res) => {
    const { title, start, end, allDay } = req.body;
    const event = new Event({ title, start, end, allDay });
    await event.save();
    return res.send(event);
});

// Rota para atualizar um evento por ID
router.put('/:id', async (req, res) => {
    const { title, start, end, allDay } = req.body;
    const event = await Event.findByIdAndUpdate(req.params.id, { title, start, end, allDay }, { new: true });
    if (!event) {
        return res.status(404).send({ error: 'Evento não encontrado' });
    }
    return res.send(event);
});

// Rota para deletar um evento por ID
router.delete('/:id', async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
        return res.status(404).send({ error: 'Evento não encontrado' });
    }
    return res.send(event);
});

module.exports = router;
