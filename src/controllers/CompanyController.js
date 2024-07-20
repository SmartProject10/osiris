const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService'); // Assuming you have a service module

// Create a new company
router.post('/', async (req, res) => {
  try {
    await companyService.createCompany(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read all companies
router.get('/', async (req, res) => {
  try {
    await companyService.getAllCompanys(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company by ID
router.get('/:id', async (req, res) => {
  try {
    await companyService.getCompanyById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update a specific company
router.put('/:id', async (req, res) => {
  try {
    await companyService.updateCompany(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error  : error.message });
  }
});

// Delete a specific company
router.delete('/:id', async (req, res) => {
  try {
    await companyService.deleteCompanyById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
