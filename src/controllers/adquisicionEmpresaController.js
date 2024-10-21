const express = require('express');
const router = express.Router();
const adquisicionEmpresaService = require('../services/adquisicionEmpresaService');

router.post('/', async (req, res) => {
  try {
    await adquisicionEmpresaService.createAdquisicionEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await adquisicionEmpresaService.getAllAdquisicionEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await adquisicionEmpresaService.getAdquisicionEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await adquisicionEmpresaService.deleteAdquisicionEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
