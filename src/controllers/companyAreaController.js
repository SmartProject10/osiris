const express = require('express');
const router = express.Router();
const companyAreaService = require('../services/companyAreaService');

// Create a new company area
router.post('/', async (req, res) => {
  try {
    await companyAreaService.createCompanyArea(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company area
router.get('/', async (req, res) => {
  try {
    await companyAreaService.getAllCompanyArea(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company area by ID
router.get('/:id', async (req, res) => {
  try {
    await companyAreaService.getCompanyAreaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await companyAreaService.deleteCompanyArea(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
