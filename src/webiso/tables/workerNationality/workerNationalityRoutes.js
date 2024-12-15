const express = require('express');
const router = express.Router();

// MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

// CONTROLADOR
const workerNationalityController = require('./workerNationalityController');

// RUTAS
router.post('/workerNationality', verifyCompanyToken, workerNationalityController.createWorkerNationality);
router.get('/workerNationality', verifyCompanyToken, workerNationalityController.getAllWorkerNationalities);

module.exports = router;