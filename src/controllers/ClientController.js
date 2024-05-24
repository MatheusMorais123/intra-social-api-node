const Cliente = require('../models/Client');
const Agente = require('../models/Agente');

const getNextAgente = async () => {
    const agentesAtivos = await Agente.find({ status: 'Ativo' }).sort('nome');
    return agentesAtivos.length ? agentesAtivos[0]._id : null;
};

module.exports = {
    async index(req, res, next) {
        try {
            const clientes = await Cliente.find().populate('agente');
            return res.json(clientes);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const { nome, email, telefone, endereco } = req.body;
            const agenteId = await getNextAgente();
            if (!agenteId) {
                return res.status(400).json({ msg: 'Nenhum agente ativo disponível' });
            }

            const novoCliente = new Cliente({
                nome,
                email,
                telefone,
                endereco,
                agente: agenteId
            });

            await novoCliente.save();
            return res.status(201).json(novoCliente);
        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.findById(id).populate('agente');
            if (!cliente) {
                return res.status(404).json({ msg: 'Cliente não encontrado' });
            }
            return res.json(cliente);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { nome, email, telefone, endereco, status, agente, valor } = req.body;

            let cliente = await Cliente.findById(id);
            if (!cliente) {
                return res.status(404).json({ msg: 'Cliente não encontrado' });
            }

            if (status === 'Vendido' && (valor === undefined || valor === null)) {
                return res.status(400).json({ msg: 'Valor é obrigatório quando o status é "Vendido"' });
            }

            cliente = await Cliente.findByIdAndUpdate(
                id,
                { $set: { nome, email, telefone, endereco, status, agente, valor } },
                { new: true }
            );

            return res.json(cliente);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.findById(id);
            if (!cliente) {
                return res.status(404).json({ msg: 'Cliente não encontrado' });
            }
    
            await Cliente.findByIdAndDelete(id);
            return res.json({ msg: 'Cliente removido' });
        } catch (error) {
            next(error);
        }
    }
    
};
