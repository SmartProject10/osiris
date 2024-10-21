const express = require('express');
const router = express.Router();
const datoEmpresaService = require('../services/datoEmpresaService');

router.post('/', async (req, res) => {
  try {
    await datoEmpresaService.createDatoEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await datoEmpresaService.getAllDatoEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await datoEmpresaService.getDatoEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await datoEmpresaService.deleteDatoEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
