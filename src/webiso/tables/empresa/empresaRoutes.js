const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const empresaController = require('./empresaController');

//RUTAS
router.post('/empresa/register', empresaController.register);
router.post('/empresa/login', empresaController.login);
router.post('/empresa/logout', empresaController.logout);
router.get('/empresa/profile', verifyCompanyToken, empresaController.profile);
router.get('/empresa/', verifyCompanyToken, empresaController.getAllCompanies);
router.get('/empresa/:id', verifyCompanyToken, empresaController.getCompanyById);
router.put('/empresa/:id', verifyCompanyToken, empresaController.updateCompanyById);
router.delete('/empresa/:id', verifyCompanyToken, empresaController.deleteCompanyById);

module.exports = router;
