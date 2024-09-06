const express = require('express');
const router = express.Router();
const distritoService = require('../services/ditritoServices'); // Assuming you have a service module

// Create a new company position
router.post('/', async (req, res) => {
  try {
    await distritoService.createDistrito(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company positions
router.get('/', async (req, res) => {
  try {
    await distritoService.getAllDistritos(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company position by ID
router.get('/:id', async (req, res) => {
  try {
    await distritoService.getDistritoById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});



module.exports = router;
