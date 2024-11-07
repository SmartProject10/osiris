const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const fechaCumplimientoActividadController = require('./fechaCumplimientoActividadController');

//RUTAS
router.post('/fechacumplimientoactividad', verifyWorkerToken, fechaCumplimientoActividadController.createActivityComplianceDate);
router.get('/fechacumplimientoactividad', verifyWorkerToken, fechaCumplimientoActividadController.getAllActivitiesComplianceDate);
router.get('/fechacumplimientoactividad/:id', verifyWorkerToken, fechaCumplimientoActividadController.getActivityComplianceDateById);
router.delete('/fechacumplimientoactividad/:id', verifyWorkerToken, fechaCumplimientoActividadController.deleteActivityComplianceDateById);

module.exports = router;