const express = require('express');
const router = express.Router();
const areaEmpresaService = require('../services/areaEmpresaService'); // Assuming './areaEmpresa.service' is the path to your areaEmpresa service file

// Create areaEmpresa route
router.post('/', async (req, res) => {
  try {
    await areaEmpresaService.createAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get areaEmpresa by ID route
router.get('/:id', async (req, res) => {
  try {
    await areaEmpresaService.getAreaEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get all areaEmpresas route (be cautious with large datasets)
router.get('/', async (req, res) => {
  try {
    await areaEmpresaService.getAllAreas(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update areaEmpresa route
router.put('/:id', async (req, res) => {
  try {
    await areaEmpresaService.updateAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Delete areaEmpresa route
router.delete('/:id', async (req, res) => {
  try {
    await areaEmpresaService.deleteAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = router;
