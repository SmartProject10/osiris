const express = require('express');
const router = express.Router();
const companyDataService = require('../services/companyDataService');

// Create a new company data
router.post('/', async (req, res) => {
  try {
    await companyDataService.createCompanyData(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company data
router.get('/', async (req, res) => {
  try {
    await companyDataService.getAllCompanyData(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company data by ID
router.get('/:id', async (req, res) => {
  try {
    await companyDataService.getCompanyDataById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await companyDataService.deleteCompanyData(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
