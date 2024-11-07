const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const sedeEmpresaController = require('./sedeEmpresaController');

// RUTAS
router.post('/sede', verifyCompanyToken, sedeEmpresaController.createSite);
router.get('/sede', verifyCompanyToken, sedeEmpresaController.getAllSites);

module.exports = router;
