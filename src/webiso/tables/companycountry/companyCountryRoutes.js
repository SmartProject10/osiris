const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyCountryController = require('./companyCountryController');

//RUTAS
router.post('/companyCountry', verifyCompanyToken, companyCountryController.createCompanyCountry);
router.get('/companyCountry', verifyCompanyToken, companyCountryController.getAllCompanyCountries);
router.get('/companyCountry/:id/getisos', verifyCompanyToken, companyCountryController.getAllIsosOfCompanyCountry);
router.get('/companyCountry/withIsos', verifyCompanyToken, companyCountryController.getAllCompanyCountriesWithIsos);

module.exports = router;
