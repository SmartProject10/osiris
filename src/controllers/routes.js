const express = require('express');
const router = express.Router();

// Importar controladores
const {register,login,logout,profile,verify_token} = require('../controllers/authController');
const {createTrabajador,getTrabajadorById,getAllTrabajadores,updateTrabajador,deleteTrabajador} = require('../controllers/trabajadorController');
const companyRegisterController = require('../controllers/companyRegisterController');
const companyDataController = require('../controllers/companyDataController');
const companyAcquisitionController = require('../controllers/companyAcquisitionController');
const companySiteController = require('../controllers/companySiteController');
const companyAreaController = require('../controllers/companyAreaController');
const {createRole} = require('../controllers/rolController');
const {companies} = require('../tests/companyTestController');

// Middlewares
const authenticateToken = require('../middlewares/validateToken');

// Rutas de empresa
router.use('/companyRegister', companyRegisterController);
router.use('/companyData' , companyDataController);
router.use('/companyAcquisition' , companyAcquisitionController);
router.use('/companySite' , companySiteController);
router.use('/companyArea' , companyAreaController);

// Rutas de trabajador
router.post('/trabajador', authenticateToken, createTrabajador);
router.get('/trabajador/:id', authenticateToken, getTrabajadorById);
router.get('/trabajadores', authenticateToken ,getAllTrabajadores);
router.put('/trabajador/:id', authenticateToken ,updateTrabajador);
router.delete('/trabajador/:id',authenticateToken, deleteTrabajador);

// Autenticacion y registro de usuarios
router.post('/auth/register',register);
router.post('/auth/login',login);
router.post('/auth/logout',logout);

//Otros
router.get('/companies', authenticateToken,companies);
router.get('/auth/profile', authenticateToken,profile);
router.post('/auth/verify_token',verify_token);

// Rol
router.post('/rol', createRole);

module.exports = router;
