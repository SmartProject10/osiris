const express = require('express');
const router = express.Router();

// Importar controladores
const {register,login,logout,profile,verify_token} = require('../controllers/authController');
const {createTrabajadorEmpresa,getTrabajadorEmpresaById,updateTrabajadorEmpresa,deleteTrabajadorEmpresa} = require('../controllers/trabajadorEmpresaController');
const registroEmpresaController = require('../controllers/registroEmpresaController');
const datoEmpresaController = require('../controllers/datoEmpresaController');
const adquisicionEmpresaController = require('../controllers/adquisicionEmpresaController');
const sedeEmpresaController = require('../controllers/sedeEmpresaController');
const areaEmpresaController = require('../controllers/areaEmpresaController');
const subempresaController = require('../controllers/subempresaController');
const {createRole} = require('../controllers/rolController');
const {companies} = require('../tests/companyTestController');

// Middlewares
const authenticateToken = require('../middlewares/validateToken');

// Rutas de empresa
router.use('/registroEmpresa', registroEmpresaController);
router.use('/datoEmpresa' , datoEmpresaController);
router.use('/adquisicionEmpresa' , adquisicionEmpresaController);
router.use('/sedeEmpresa' , sedeEmpresaController);
router.use('/areaEmpresa' , areaEmpresaController);

// Ruta subempresa
router.use('/subempresa' , subempresaController);

// Rutas de trabajador
router.post('/trabajadorEmpresa', authenticateToken, createTrabajadorEmpresa);
router.get('/trabajadorEmpresa/:id', authenticateToken, getTrabajadorEmpresaById);
router.put('/trabajadorEmpresa/:id', authenticateToken ,updateTrabajadorEmpresa);
router.delete('/trabajadorEmpresa/:id',authenticateToken, deleteTrabajadorEmpresa);

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
