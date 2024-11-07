const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const actividadController = require('./actividadController');

//RUTAS
router.post('/actividad', verifyWorkerToken, actividadController.createActivity);
router.get('/actividad', verifyWorkerToken, actividadController.getAllActivities);
router.get('/actividad/:id', verifyWorkerToken, actividadController.getActivityById);
router.delete('/actividad/:id', verifyWorkerToken, actividadController.deleteActivityById);

module.exports = router;