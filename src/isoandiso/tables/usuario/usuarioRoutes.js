const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyUserToken } = require('../../../token/verifyToken');

//CONTROLADOR
const usuarioController = require('./usuarioController');

//RUTAS
router.post('/usuario/register', usuarioController.register);
router.post('/usuario/login', usuarioController.login);
router.post('/usuario/logout', verifyUserToken, usuarioController.logout);
router.get('/usuario/profile', verifyUserToken, usuarioController.profile);
router.get('/usuario', verifyUserToken, usuarioController.getAllUsers);
router.get('/usuario/:id', verifyUserToken, usuarioController.getUserById);
router.put('/usuario/:id', verifyUserToken, usuarioController.updateUserById);
router.delete('/usuario/:id', verifyUserToken, usuarioController.deleteUserById);

module.exports = router;