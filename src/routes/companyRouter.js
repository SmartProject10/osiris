// src/routes/userRoutes.js
const express = require('express');
const CompanyControllers = require('../controllers/CompanyController');
const companyEconomicActivityRouter = require('../controllers/companyEconomicActivity.controller');
const companyIsoRouter = require('../controllers/companyIso.controller')
const router = express.Router();
const app = express();


router.get('/company-economic-activities', companyEconomicActivityRouter); 

router.get('/company', CompanyControllers); 

router.get('/company-isos', companyIsoRouter); 

router.get('/company/:id', CompanyControllers);

module.exports = router;