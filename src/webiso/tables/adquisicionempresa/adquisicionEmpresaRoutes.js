const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const adquisicionEmpresaController = require('./adquisicionEmpresaController');

//RUTAS
router.post('/adquisicionempresa', verifyCompanyToken, adquisicionEmpresaController.createAcquisition);
router.get('/adquisicionempresa', verifyCompanyToken, adquisicionEmpresaController.getAllAcquisitions);
router.get('/adquisicionempresa/:id', verifyCompanyToken, adquisicionEmpresaController.getAcquisitionById);
router.delete('/adquisicionempresa/:id', verifyCompanyToken, adquisicionEmpresaController.deleteAcquisitionById);

module.exports = router;
