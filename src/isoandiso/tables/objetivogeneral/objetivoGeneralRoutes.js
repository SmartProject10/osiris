const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const objetivoGeneralController = require('./objetivoGeneralController');

//RUTAS
router.post('/objetivogeneral', verifyWorkerToken, objetivoGeneralController.createGeneralObjective);
router.get('/objetivogeneral', verifyWorkerToken, objetivoGeneralController.getAllGeneralObjectives);
router.get('/objetivogeneral/:id', verifyWorkerToken, objetivoGeneralController.getGeneralObjectiveById);
router.delete('/objetivogeneral/:id', verifyWorkerToken, objetivoGeneralController.deleteGeneralObjectiveById);

module.exports = router;