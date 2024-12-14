const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const workerController = require('./workerController');

//RUTAS
router.post('/worker/register', workerController.register);
router.post('/worker/login', workerController.login);
router.post('/worker/logout', verifyWorkerToken, workerController.logout);
router.get('/worker/profile', verifyWorkerToken, workerController.profile);
router.get('/worker/', verifyWorkerToken, workerController.getAllCompanyWorkers);
router.get('/worker/:id', verifyWorkerToken, workerController.getCompanyWorker);
router.put('/worker/:id', verifyWorkerToken, workerController.updateCompanyWorker);
router.delete('/worker/:id', verifyWorkerToken, workerController.deleteCompanyWorker);

module.exports = router;