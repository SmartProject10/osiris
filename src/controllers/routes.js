const express = require('express');
const router = express.Router();

// Importar controladores
const authController = require('../controllers/authController');
const companyRegisterController = require('../controllers/companyRegisterController');
const companyDataController = require('../controllers/companyDataController');
const companyAcquisitionController = require('../controllers/companyAcquisitionController');
const companySiteController = require('../controllers/companySiteController');
const companyAreaController = require('../controllers/companyAreaController');

// Middlewares
const authenticateToken = require('../middlewares/verifyToken');

// Rutas de autenticación
router.use('/auth', authController);

// Rutas de empresa
router.use('/companyRegister', companyRegisterController);
router.use('/companyData', authenticateToken , companyDataController);
router.use('/companyAcquisition', authenticateToken , companyAcquisitionController);
router.use('/companySite', authenticateToken , companySiteController);
router.use('/companyArea', authenticateToken , companyAreaController);

module.exports = router;
