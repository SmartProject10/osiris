const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const trabajadorController = require('./trabajadorController');

//RUTAS
router.post('/trabajador/register', trabajadorController.register);
router.post('/trabajador/login', trabajadorController.login);
router.post('/trabajador/logout', trabajadorController.logout);
router.get('/trabajador/profile', verifyWorkerToken, trabajadorController.profile);
router.get('/trabajador/', verifyWorkerToken, trabajadorController.getAllCompanyWorkers);
router.get('/trabajador/:id', verifyWorkerToken, trabajadorController.getCompanyWorkerById);
router.put('/trabajador/:id', verifyWorkerToken, trabajadorController.updateCompanyWorkerById);
router.delete('/trabajador/:id', verifyWorkerToken, trabajadorController.deleteCompanyWorkerById);

module.exports = router;