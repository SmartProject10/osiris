const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const areaEmpresaController = require('./areaEmpresaController');

//RUTAS
router.post('/areaempresa', verifyCompanyToken, areaEmpresaController.createArea);
router.get('/areaempresa', verifyCompanyToken, areaEmpresaController.getAllAreas);
router.get('/areaempresa/:id', verifyCompanyToken, areaEmpresaController.getAreaById);
router.get('/areaempresa/:id/obtenerelcargodemayorjerarquia', verifyCompanyToken, areaEmpresaController.getChargeOfHigherHierarchyOfAreaById);
router.delete('/areaempresa/:id', verifyCompanyToken, areaEmpresaController.deleteAreaById);

module.exports = router;
