const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyAcquisitionController = require('./companyAcquisitionController');

//RUTAS
router.post('/companyAcquisition', verifyCompanyToken, companyAcquisitionController.createCompanyAcquisition);
router.get('/companyAcquisition', verifyCompanyToken, companyAcquisitionController.getAllCompanyAcquisitions);
router.get('/companyAcquisition/:id', verifyCompanyToken, companyAcquisitionController.getCompanyAcquisition);
router.delete('/companyAcquisition/:id', verifyCompanyToken, companyAcquisitionController.deleteCompanyAcquisition);

module.exports = router;
