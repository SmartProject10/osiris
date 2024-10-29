const express = require('express');
const router = express.Router();

// Importar controladores
const {register,login,logout,profile,verify_token} = require('../controllers/authController');
const {createTrabajadorEmpresa,getTrabajadorEmpresaById,updateTrabajadorEmpresa,deleteTrabajadorEmpresa} = require('../controllers/trabajadorEmpresaController');
const empresaController = require('./empresaController');
const adquisicionEmpresaController = require('../controllers/adquisicionEmpresaController');
const sedeEmpresaController = require('../controllers/sedeEmpresaController');
const areaEmpresaController = require('../controllers/areaEmpresaController');
const subempresaController = require('../controllers/subempresaController');
const {createRole} = require('./rolTrabajadorController');
const {companies} = require('../tests/companyTestController');
const paisController = require('../controllers/paisController')
const tipoDeAdquisicionController = require('../controllers/tipoDeAdquisicionController')

//modulo gestion de actividades
const actividadController = require('../controllers/actividadController');
const fechaCumpActividadController = require('../controllers/fechaCumpActividadController');
const isoController = require('../controllers/isoController');
const objetivoEspecificoController = require('../controllers/objetivoEspecificoController');
const objetivoGeneralController = require('../controllers/objetivoGeneralController');

// Middlewares
const authenticateToken = require('../middlewares/validateToken');

// Rutas modulo gestion de actividades
router.use('/actividadController', actividadController);
router.use('/fechaCumpActividadController' , fechaCumpActividadController);
router.use('/isoController' , isoController);
router.use('/objetivoEspecificoController' , objetivoEspecificoController);
router.use('/objetivoGeneralController' , objetivoGeneralController);

// Rutas de empresa
router.use('/empresa', empresaController);
router.use('/adquisicionEmpresa' , adquisicionEmpresaController);
router.use('/sedeEmpresa' , sedeEmpresaController);
router.use('/areaEmpresa' , areaEmpresaController);

// Ruta subempresa
router.use('/subempresa' , subempresaController);

// Ruta iso
router.use('/iso' , isoController);

// Ruta pais
router.use('/pais' , paisController);

// Ruta tipo de adquisicion
router.use('/tipodeadquisicion' , tipoDeAdquisicionController);

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
