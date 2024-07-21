const express = require('express');
const router = express.Router();
const cargoEmpresaService = require('../services/cargoEmpresaService'); // Assuming you have a service module

// Create a new company position
router.post('/', async (req, res) => {
  try {
    await cargoEmpresaService.createCargo(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company positions
router.get('/', async (req, res) => {
  try {
    await cargoEmpresaService.getAllCargos(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company position by ID
router.get('/:id', async (req, res) => {
  try {
    await cargoEmpresaService.getCargoById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update a specific company position
router.put('/:id', async (req, res) => {
  try {
    await cargoEmpresaService.updateCargo(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error  : error.message });
  }

});


router.delete('/:id', async (req, res) => {
  try {
    await cargoEmpresaService.deleteCargo(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
