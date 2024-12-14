const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyController = require('./companyController');

//RUTAS
router.post('/company/register', companyController.register);
router.post('/company/login', companyController.login);
router.post('/company/logout',verifyCompanyToken, companyController.logout);
router.get('/company/profile', verifyCompanyToken, companyController.profile);
router.get('/company/', verifyCompanyToken, companyController.getAllCompanies);
router.get('/company/:id', verifyCompanyToken, companyController.getCompany);
router.put('/company/:id/updatePassword', verifyCompanyToken, companyController.updatePassword);
router.put('/company/:id/updateCountry', verifyCompanyToken, companyController.updateCountry);
router.put('/company/:id/updateRuc', verifyCompanyToken, companyController.updateRuc);
router.put('/company/:id/updateSocialReason', verifyCompanyToken, companyController.updateSocialReason);
router.put('/company/:id/updateCity', verifyCompanyToken, companyController.updateCity);
router.put('/company/:id/updateAddress', verifyCompanyToken, companyController.updateAddress);
router.put('/company/:id/updateEconomicActivity', verifyCompanyToken, companyController.updateEconomicActivity);
router.put('/company/:id/updateEconomicSector', verifyCompanyToken, companyController.updateEconomicSector);
router.put('/company/:id/updateCompanySize', verifyCompanyToken, companyController.updateCompanySize);
router.put('/company/:id/addAcquisition', verifyCompanyToken, companyController.addAcquisition);
router.put('/company/:id/addSite', verifyCompanyToken, companyController.addSite);
router.put('/company/:id/addArea', verifyCompanyToken, companyController.addArea);
router.get('/company/:id/country', verifyCompanyToken, companyController.getCompanyCountry);
router.get('/company/:id/acquisitions', verifyCompanyToken, companyController.getCompanyAcquisitions);
router.delete('/company/:id', verifyCompanyToken, companyController.deleteCompany);

module.exports = router;
