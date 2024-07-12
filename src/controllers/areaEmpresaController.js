const express = require('express');
const router = express.Router();
const areaEmpresaService = require('../services/areaEmpresaService'); // Assuming './areaEmpresa.service' is the path to your areaEmpresa service file

// Create areaEmpresa route
router.post('/areaEmpresas', async (req, res) => {
  try {
    await areaEmpresaService.createAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get areaEmpresa by ID route
router.get('/areaEmpresas/:id', async (req, res) => {
  try {
    await areaEmpresaService.getAreaEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get all areaEmpresas route (be cautious with large datasets)
router.get('/areaEmpresas', async (req, res) => {
  try {
    await areaEmpresaService.getAllAreaEmpresas(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update areaEmpresa route
router.put('/areaEmpresas/:id', async (req, res) => {
  try {
    await areaEmpresaService.updateAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Delete areaEmpresa route
router.delete('/areaEmpresas/:id', async (req, res) => {
  try {
    await areaEmpresaService.deleteAreaEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = router;
