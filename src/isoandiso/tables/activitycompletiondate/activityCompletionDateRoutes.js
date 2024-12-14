const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const activityCompletionDateController = require('./activityCompletionDateController');

//RUTAS
router.post('/activityCompletionDate', verifyWorkerToken, activityCompletionDateController.createActivityComplianceDate);
router.get('/activityCompletionDate', verifyWorkerToken, activityCompletionDateController.getAllActivitiesComplianceDate);
router.get('/activityCompletionDate/:id', verifyWorkerToken, activityCompletionDateController.getActivityComplianceDate);
router.delete('/activityCompletionDate/:id', verifyWorkerToken, activityCompletionDateController.deleteActivityComplianceDate);

module.exports = router;