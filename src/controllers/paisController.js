const express = require('express');
const router = express.Router();
const paisService = require('../services/paisService'); // Assuming you have an pais.service module

// Create pais record
router.post('/', async (req, res) => {
  try {
    await paisService.createPais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read pais record by ID
router.get('/:id', async (req, res) => {
  try {
    await paisService.getPaisById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Update pais record
router.put('/:id', async (req, res) => {
  try {
    await paisService.updatePais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await paisService.getAllPais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
  });

// Delete pais record
router.delete('/:id', async (req, res) => {
  try {
    await companyService.deleteCompanyById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});


module.exports = router;
