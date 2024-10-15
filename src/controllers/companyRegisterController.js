const express = require('express');
const router = express.Router();
const companyRegisterService = require('../services/companyRegisterService');

// Create a new company
router.post('/', async (req, res) => {
  try {
    await companyRegisterService.createCompany(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company
router.get('/', async (req, res) => {
  try {
    await companyRegisterService.getAllCompanies(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company by ID
router.get('/:id', async (req, res) => {
  try {
    await companyRegisterService.getCompanyById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await companyRegisterService.deleteCompany(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
