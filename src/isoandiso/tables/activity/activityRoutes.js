const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyWorkerToken } = require('../../../token/verifyToken');

//CONTROLADOR
const activityController = require('./activityController');

//RUTAS
router.post('/activity', verifyWorkerToken, activityController.createActivity);
router.get('/activity', verifyWorkerToken, activityController.getAllActivities);
router.get('/activity/:id', verifyWorkerToken, activityController.getActivity);
router.delete('/activity/:id', verifyWorkerToken, activityController.deleteActivity);

module.exports = router;