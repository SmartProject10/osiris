const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const objetivoEspecificoController = require('./objetivoEspecificoController');

//RUTAS
router.post('/objetivoespecifico', verifyWorkerToken, objetivoEspecificoController.createSpecificObjective);
router.get('/objetivoespecifico', verifyWorkerToken, objetivoEspecificoController.getAllSpecificObjectives);
router.get('/objetivoespecifico/:id', verifyWorkerToken, objetivoEspecificoController.getSpecificObjectiveById);
router.delete('/objetivoespecifico/:id', verifyWorkerToken, objetivoEspecificoController.deleteSpecificObjectiveById);

module.exports = router;
