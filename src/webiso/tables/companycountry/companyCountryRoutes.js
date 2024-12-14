const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyCountryController = require('./companyCountryController');

//RUTAS
router.post('/companyCountry', verifyCompanyToken, companyCountryController.createCountry);
router.get('/companyCountry', verifyCompanyToken, companyCountryController.getAllCountries);
router.get('/companyCountry/:id/getisos', verifyCompanyToken, companyCountryController.getAllIsosOfCountry);
router.get('/companyCountry/withIsos', verifyCompanyToken, companyCountryController.getAllCountriesWithIsos);

module.exports = router;
