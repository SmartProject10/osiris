const express = require('express');
const router = express.Router();
const datosFamiliares = require('../services/fichaUsuario/datosFamiliares');
const datosContactos = require('../services/fichaUsuario/datosContactos');

// Rutas para datos familiares
router.post('/datos_familiares/:email', datosFamiliares.createDatosFamiliares);
router.patch('/datos_familiares/:email/:id', datosFamiliares.updateDatosFamiliares);
router.get('/datos_familiares/:email', datosFamiliares.listDatosFamiliares);
router.get('/datos_familiares/:email/:id', datosFamiliares.getDatoFamiliar);

// Rutas para datos contactos
router.post('/datos_contactos/:email', datosContactos.createDatosContactos);
router.patch('/datos_contactos/:email/:id', datosContactos.updateDatosContactos);
router.get('/datos_contactos/:email', datosContactos.listDatosContactos);
router.get('/datos_contactos/:email/:id', datosContactos.getDatoContacto);


module.exports = router;
