const express = require('express');
const router = express.Router();
const areaEmpresaService = require('../services/areaEmpresaService');

router.post('/', async (req, res) => {
  try {
    await areaEmpresaService.createAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await areaEmpresaService.getAllAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await areaEmpresaService.getAreaEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await areaEmpresaService.deleteAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
