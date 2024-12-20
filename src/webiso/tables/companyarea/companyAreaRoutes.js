const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyCompanyToken } = require('../../../token/verifyToken');

//CONTROLADOR
const companyAreaController = require('./companyAreaController');

//RUTAS
router.post('/companyArea', verifyCompanyToken, companyAreaController.createCompanyArea);
router.get('/companyArea', verifyCompanyToken, companyAreaController.getAllCompanyAreas);
router.get('/companyArea/:id', verifyCompanyToken, companyAreaController.getCompanyArea);
router.get('/companyArea/:id/getChargeOfHigherHierarchyOfArea', verifyCompanyToken, companyAreaController.getChargeOfHigherHierarchyOfArea);
router.put('/companyArea/:id/updateIso', verifyCompanyToken, companyAreaController.updateIso);
router.delete('/companyArea/:id', verifyCompanyToken, companyAreaController.deleteCompanyArea);
router.delete('/companyArea/:id/deleteIsoId', verifyCompanyToken, companyAreaController.deleteIsoOfCompanyArea);

module.exports = router;
