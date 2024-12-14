const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const specificObjectiveController = require('./specificObjectiveController');

//RUTAS
router.post('/specificObjective', verifyWorkerToken, specificObjectiveController.createSpecificObjective);
router.get('/specificObjective', verifyWorkerToken, specificObjectiveController.getAllSpecificObjectives);
router.get('/specificObjective/:id', verifyWorkerToken, specificObjectiveController.getSpecificObjective);
router.delete('/specificObjective/:id', verifyWorkerToken, specificObjectiveController.deleteSpecificObjective);

module.exports = router;
