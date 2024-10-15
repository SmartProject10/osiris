const express = require('express');
const router = express.Router();
const companySiteService = require('../services/companySiteService');

// Create a new company site
router.post('/', async (req, res) => {
  try {
    await companySiteService.createCompanySite(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company site
router.get('/', async (req, res) => {
  try {
    await companySiteService.getAllCompanySite(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company site by ID
router.get('/:id', async (req, res) => {
  try {
    await companySiteService.getCompanySiteById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await companySiteService.deleteCompanySite(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
