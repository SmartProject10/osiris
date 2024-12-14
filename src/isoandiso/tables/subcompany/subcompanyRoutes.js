const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const subcompanyController = require('./subcompanyController');

//RUTAS
router.post('/subcompany', verifyWorkerToken, subcompanyController.createSubcompany);
router.get('/subcompany', verifyWorkerToken, subcompanyController.getAllSubcompanies);
router.get('/subcompany/:id', verifyWorkerToken, subcompanyController.getSubcompany);
router.delete('/subcompany/:id', verifyWorkerToken, subcompanyController.deleteSubcompany);

module.exports = router;