const Cliente = require('../models/Client');
const Agente = require('../models/Agente');
const mongoose = require('mongoose');

module.exports = {
    async clientesPorStatus(req, res, next) {
        try {
            // Extrair parâmetros da requisição
            const { periodo, agenteNome, status } = req.query;

            // Criar objeto de filtro inicial
            const filtro = {};

            // Adicionar filtro por período, se fornecido
            if (periodo) {
                filtro.dataCriacao = { $gte: new Date(periodo) };
            }

            // Adicionar filtro por agente, se fornecido
            if (agenteNome) {
                // Procurar o ID do agente pelo nome
                const agente = await Agente.findOne({ nome: agenteNome });
                if (agente) {
                    filtro.agente = agente._id;
                } else {
                    return res.status(404).json({ message: "Agente não encontrado." });
                }
            }

            // Adicionar filtro por status, se fornecido
            if (status) {
                filtro.status = status;
            }

            // Consultar clientes com base nos filtros
            //const clientes = await Cliente.find(filtro);
            const clientes = await Cliente.find(filtro).populate('agente');

            // Retornar resultado da consulta
            return res.json(clientes);
        } catch (error) {
            next(error);
        }
    }
};
