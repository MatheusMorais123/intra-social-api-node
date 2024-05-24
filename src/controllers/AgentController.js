const Agente = require('../models/Agente');

module.exports = {
    async index(req, res, next) {
        try {
            const agentes = await Agente.find();
            return res.json(agentes);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const { nome, email } = req.body;

            const novoAgente = new Agente({
                nome,
                email
            });

            await novoAgente.save();
            return res.status(201).json(novoAgente);
        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const agente = await Agente.findById(id);
            if (!agente) {
                return res.status(404).json({ msg: 'Agente não encontrado' });
            }
            return res.json(agente);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { nome, email, status } = req.body;

            let agente = await Agente.findById(id);
            if (!agente) {
                return res.status(404).json({ msg: 'Agente não encontrado' });
            }

            agente = await Agente.findByIdAndUpdate(
                id,
                { $set: { nome, email, status } },
                { new: true }
            );

            return res.json(agente);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const agente = await Agente.findById(id);
            if (!agente) {
                return res.status(404).json({ msg: 'Agente não encontrado' });
            }

            await Agente.findByIdAndRemove(id);
            return res.json({ msg: 'Agente removido' });
        } catch (error) {
            next(error);
        }
    }
};
