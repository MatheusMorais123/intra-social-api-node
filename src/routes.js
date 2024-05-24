const express = require('express');
const router = express.Router();
const ClientController = require('./controllers/ClientController');
const AgentController = require('./controllers/AgentController');
const ReportController = require('./controllers/ReportController')
// Rotas para Clientes
router.get('/client', ClientController.index);
router.post('/client', ClientController.create);
router.get('/client/:id', ClientController.findById);
router.put('/client/:id', ClientController.update);
router.delete('/client/:id', ClientController.delete);
router.get('/filtro', ReportController.clientesPorStatus);

// Rotas para Agentes
router.get('/agent', AgentController.index);
router.post('/agent', AgentController.create);
router.get('/agent/:id', AgentController.findById);
router.put('/agent/:id', AgentController.update);
router.delete('/agent/:id', AgentController.delete);

module.exports = router;
