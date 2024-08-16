const express = require('express');
const router = express.Router();
const datoPersonales = require('../services/fichaUsuario/datoPersonales');
const fichausuario = require('../services/fichaUsuario/fichaUsuarioService');
const datoLaborales = require('../services/fichaUsuario/datoLaborales');
const datosFamiliares = require('../services/fichaUsuario/datosFamiliares');
const datosContactos = require('../services/fichaUsuario/datosContactos');

// ficha usuario
router.get('/dato_ficha/:email/:id', fichausuario.getFichaUsuario);

// Rutas para datos personales
router.post('/dato_personales/', datoPersonales.createDatoPersonales);
router.patch('/dato_personales/:fichaUsuarioId/:id', datoPersonales.updateDatoPersonales);

// Rutas para datos laborales
router.post('/dato_laborales/:fichaUsuarioId', datoLaborales.createDatoLaborales);
router.patch('/dato_laborales/:fichaUsuarioId/:id', datoLaborales.updateDatoLaborales);

// Rutas para datos familiares
router.post('/datos_familiares/:fichaUsuarioId', datosFamiliares.createDatosFamiliares);
router.patch('/datos_familiares/:fichaUsuarioId/:id', datosFamiliares.updateDatosFamiliares);
router.get('/datos_familiares/:fichaUsuarioId', datosFamiliares.listDatosFamiliares);
router.get('/datos_familiares/:fichaUsuarioId/:id', datosFamiliares.getDatoFamiliar);
router.delete('/datos_familiares/:fichaUsuarioId/:id', datosFamiliares.deleteDatosFamiliares);

// Rutas para datos contactos
router.post('/datos_contactos/:fichaUsuarioId', datosContactos.createDatosContactos);
router.patch('/datos_contactos/:fichaUsuarioId/:id', datosContactos.updateDatosContactos);
router.get('/datos_contactos/:fichaUsuarioId', datosContactos.listDatosContactos);
router.get('/datos_contactos/:fichaUsuarioId/:id', datosContactos.getDatoContacto);
router.delete('/datos_contactos/:fichaUsuarioId/:id', datosContactos.deleteDatosContactos);

module.exports = router;
