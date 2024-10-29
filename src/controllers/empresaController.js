const express = require('express');
const router = express.Router();
const empresaService = require('../services/empresaService');

router.post('/', async (req, res) => {
  try {
    await empresaService.createEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await empresaService.getAllEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await empresaService.getEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await empresaService.deleteEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id/getAllAreasEmpresa', async (req, res) => {
  try {
    await empresaService.getAllAreasEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});


module.exports = router;
