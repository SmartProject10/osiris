const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const acquisitionTypeController = require('./acquisitionTypeController');

// RUTAS
router.post('/acquisitionType', verifyCompanyToken, acquisitionTypeController.createTypeOfAcquisition);
router.get('/acquisitionType', verifyCompanyToken, acquisitionTypeController.getAllTypeOfAcquisitions);

module.exports = router;