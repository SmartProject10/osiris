const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const subempresaController = require('./subempresaController');

//RUTAS
router.post('/subempresa', verifyWorkerToken, subempresaController.createSubcompany);
router.get('/subempresa', verifyWorkerToken, subempresaController.getAllSubcompanies);
router.get('/subempresa/:id', verifyWorkerToken, subempresaController.getSubcompanyById);
router.delete('/subempresa/:id', verifyWorkerToken, subempresaController.deleteSubcompanyById);

module.exports = router;