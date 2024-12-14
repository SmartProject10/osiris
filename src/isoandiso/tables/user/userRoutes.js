const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyUserToken } = require('../../../token/verifyToken');

//CONTROLADOR
const userController = require('./userController');

//RUTAS
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/logout', verifyUserToken, userController.logout);
router.get('/user/profile', verifyUserToken, userController.profile);
router.get('/user', verifyUserToken, userController.getAllUsers);
router.get('/user/:id', verifyUserToken, userController.getUser);
router.put('/user/:id', verifyUserToken, userController.getUserupdateUser);
router.delete('/user/:id', verifyUserToken, userController.deleteUser);

module.exports = router;