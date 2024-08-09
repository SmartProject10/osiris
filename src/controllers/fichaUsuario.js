const express = require('express');
const router = express.Router();
const datosFamiliares = require('../services/fichaUsuario/datosFamiliares');

// Rutas para datos familiares
router.post('/datos_familiares/:email', datosFamiliares.createDatosFamiliares);
router.patch('/datos_familiares/:email/:id', datosFamiliares.updateDatosFamiliares);
router.get('/datos_familiares/:email', datosFamiliares.listDatosFamiliares);
router.get('/datos_familiares/:email/:id', datosFamiliares.getDatoFamiliar);


module.exports = router;
