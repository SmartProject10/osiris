const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const companySiteController = require('./companySiteController');

// RUTAS
router.post('/companySite', verifyCompanyToken, companySiteController.createSite);
router.get('/companySite', verifyCompanyToken, companySiteController.getAllSites);
router.delete('/companySite/:id', verifyCompanyToken, companySiteController.deleteSite);

module.exports = router;
