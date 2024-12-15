const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const companyAcquisitionTypeController = require('./companyAcquisitionTypeController');

// RUTAS
router.post('/companyAcquisitionType', verifyCompanyToken, companyAcquisitionTypeController.createCompanyAcquisitionType);
router.get('/companyAcquisitionType', verifyCompanyToken, companyAcquisitionTypeController.getAllCompanyAcquisitionTypes);

module.exports = router;