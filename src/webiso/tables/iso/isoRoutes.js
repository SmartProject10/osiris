const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const isoController = require('./isoController');

//RUTAS
router.post('/iso', verifyCompanyToken, isoController.createIso);
router.get('/iso', verifyCompanyToken, isoController.getAllIsos);
router.get('/iso/:id', verifyCompanyToken, isoController.getIso);
router.delete('/iso/:id', verifyCompanyToken, isoController.deleteIso);

module.exports = router;
