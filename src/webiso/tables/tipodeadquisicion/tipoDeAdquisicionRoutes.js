const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const tipoDeAdquisicionController = require('./tipoDeAdquisicionController');

// RUTAS
router.post('/tipodeadquisicion', verifyCompanyToken, tipoDeAdquisicionController.createTypeOfAcquisition);
router.get('/tipodeadquisicion', verifyCompanyToken, tipoDeAdquisicionController.getAllTypeOfAcquisitions);

module.exports = router;