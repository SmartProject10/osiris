const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const nacionalidadController = require('./nacionalidadController');

//RUTAS
router.post('/nacionalidad', verifyCompanyToken, nacionalidadController.createNationality);
router.get('/nacionalidad', verifyCompanyToken, nacionalidadController.getAllNationalities);

module.exports = router;
