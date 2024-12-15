const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const companySiteController = require('./companySiteController');

// RUTAS
router.post('/companySite', verifyCompanyToken, companySiteController.createCompanySite);
router.get('/companySite', verifyCompanyToken, companySiteController.getAllCompanySites);
router.delete('/companySite/:id', verifyCompanyToken, companySiteController.deleteCompanySite);

module.exports = router;
