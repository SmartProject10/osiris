const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService'); // Assuming you have a service module

// Create a new company
router.post('/', async (req, res) => {
  try {
    const companyData = req.body; // Extract company data from request body
    const createdCompany = await companyService.createCompany(companyData);
    res.status(201).json(createdCompany); // Send created company in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read all companies
router.get('/', async (req, res) => {
  try {
    const companies = await companyService.getAllCompanys();
    res.json(companies); // Send all companies in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read a specific company by ID
router.get('/:id', async (req, res) => {
  try {
    const companyId = req.params.id; // Get company ID from request parameters
    const company = await companyService.getCompanyById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company); // Send company in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Update a specific company
router.put('/:id', async (req, res) => {
  try {
    const companyId = req.params.id; // Get company ID from request parameters
    const companyData = req.body; // Extract updated company data from request body
    const updatedCompany = await companyService.updateCompanyById(companyId, companyData);
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(updatedCompany); // Send updated company in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Delete a specific company
router.delete('/:id', async (req, res) => {
  try {
    const companyId = req.params.id; // Get company ID from request parameters
    await companyService.deleteCompanyById(companyId);
    res.status(204).json(); // Send no content response on successful deletion
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Error handling function (example)
function handleError(error, res) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = router;
