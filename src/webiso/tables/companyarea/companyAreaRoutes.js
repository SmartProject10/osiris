const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyAreaController = require('./companyAreaController');

//RUTAS
router.post('/companyArea', verifyCompanyToken, companyAreaController.createArea);
router.get('/companyArea', verifyCompanyToken, companyAreaController.getAllAreas);
router.get('/companyArea/:id', verifyCompanyToken, companyAreaController.getArea);
router.get('/companyArea/:id/getChargeOfHigherHierarchyOfArea', verifyCompanyToken, companyAreaController.getChargeOfHigherHierarchyOfArea);
router.put('/companyArea/:id/updateIso', verifyCompanyToken, companyAreaController.updateIso);
router.delete('/companyArea/:id', verifyCompanyToken, companyAreaController.deleteArea);
router.delete('/companyArea/:id/deleteIsoId', verifyCompanyToken, companyAreaController.deleteIsoOfArea);

module.exports = router;
