const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const generalObjectiveController = require('./generalObjectiveController');

//RUTAS
router.post('/generalObjective', verifyWorkerToken, generalObjectiveController.createGeneralObjective);
router.get('/generalObjective', verifyWorkerToken, generalObjectiveController.getAllGeneralObjectives);
router.get('/generalObjective/:id', verifyWorkerToken, generalObjectiveController.getGeneralObjective);
router.delete('/generalObjective/:id', verifyWorkerToken, generalObjectiveController.deleteGeneralObjective);

module.exports = router;