const express = require('express');
const router = express.Router();

// Importar controladores
const authController = require('../controllers/authController');
const companyRegisterController = require('../controllers/companyRegisterController');
const companyDataController = require('../controllers/companyDataController');
const companyAcquisitionController = require('../controllers/companyAcquisitionController');
const companySiteController = require('../controllers/companySiteController');
const companyAreaController = require('../controllers/companyAreaController');
const {companytest}= require('../tests/companyTestController');

// Middlewares
const authenticateToken = require('../middlewares/validateToken');

// Rutas de autenticación
//router.use('/auth', authController);

// Rutas de empresa
router.use('/companyRegister', companyRegisterController);
router.use('/companyData', authenticateToken , companyDataController);
router.use('/companyAcquisition', authenticateToken , companyAcquisitionController);
router.use('/companySite', authenticateToken , companySiteController);
router.use('/companyArea', authenticateToken , companyAreaController);

// Autenticacion y registro de usuarios
router.post('/auth/register',authController.register);
router.post('/auth/login',authController.login);
router.post('/auth/logout',authController.logout);
router.post('/auth/verify_token',authController.verify_token);

//Otros
router.get('/auth/profile', authenticateToken,authController.profile);
router.get('/companies', authenticateToken,companytest);

module.exports = router;