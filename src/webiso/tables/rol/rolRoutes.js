const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const rolController = require('./rolController');

// RUTAS
router.post('/rol', verifyCompanyToken, rolController.createRol);
router.get('/rol', verifyCompanyToken, rolController.getAllRoles);

module.exports = router;
