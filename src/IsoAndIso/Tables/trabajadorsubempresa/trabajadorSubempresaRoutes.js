const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const trabajadorSubempresaController = require('./trabajadorSubempresaController');

//RUTAS
router.post('/trabajadorsubempresa', verifyWorkerToken, trabajadorSubempresaController.createSubcompanyWorker);
router.get('/trabajadorsubempresa', verifyWorkerToken, trabajadorSubempresaController.getAllSubcompanyWorkers);
router.get('/trabajadorsubempresa/:id', verifyWorkerToken, trabajadorSubempresaController.getSubcompanyWorkerById);
router.delete('/trabajadorsubempresa/:id', verifyWorkerToken, trabajadorSubempresaController.deleteSubcompanyWorkerById);

module.exports = router;