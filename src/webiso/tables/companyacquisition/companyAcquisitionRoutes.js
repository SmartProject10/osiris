const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyAcquisitionController = require('./companyAcquisitionController');

//RUTAS
router.post('/companyAcquisition', verifyCompanyToken, companyAcquisitionController.createAcquisition);
router.get('/companyAcquisition', verifyCompanyToken, companyAcquisitionController.getAllAcquisitions);
router.get('/companyAcquisition/:id', verifyCompanyToken, companyAcquisitionController.getAcquisition);
router.delete('/companyAcquisition/:id', verifyCompanyToken, companyAcquisitionController.deleteAcquisition);

module.exports = router;
