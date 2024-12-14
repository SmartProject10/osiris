const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const subcompanyWorkerController = require('./subcompanyWorkerController');

//RUTAS
router.post('/subcompanyWorker', verifyWorkerToken, subcompanyWorkerController.createSubcompanyWorker);
router.get('/subcompanyWorker', verifyWorkerToken, subcompanyWorkerController.getAllSubcompanyWorkers);
router.get('/subcompanyWorker/:id', verifyWorkerToken, subcompanyWorkerController.getSubcompanyWorker);
router.delete('/subcompanyWorker/:id', verifyWorkerToken, subcompanyWorkerController.deleteSubcompanyWorker);

module.exports = router;