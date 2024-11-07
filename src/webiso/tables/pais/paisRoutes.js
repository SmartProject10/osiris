const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const paisController = require('./paisController');

//RUTAS
router.post('/pais', verifyCompanyToken, paisController.createCountry);
router.get('/pais', verifyCompanyToken, paisController.getAllCountries);
router.get('/pais/:id/obtenertodaslasisosdelpais', verifyCompanyToken, paisController.getAllIsosOfCountry);

module.exports = router;
