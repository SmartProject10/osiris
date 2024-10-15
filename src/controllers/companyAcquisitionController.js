const express = require('express');
const router = express.Router();
const companyAcquisitionService = require('../services/companyAcquisitionService');

// Create a new company acquisition
router.post('/', async (req, res) => {
  try {
    await companyAcquisitionService.createCompanyAcquisition(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all company acquisition
router.get('/', async (req, res) => {
  try {
    await companyAcquisitionService.getAllCompanyAcquisition(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific company acquisition by ID
router.get('/:id', async (req, res) => {
  try {
    await companyAcquisitionService.getCompanyAcquisitionById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await companyAcquisitionService.deleteCompanyAcquisition(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
