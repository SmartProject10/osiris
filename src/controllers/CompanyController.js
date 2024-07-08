const express = require('express');
const companyService = require('../services/companyService.js'); 

const router = express.Router();

router.post('/company/register', async (req, res) => {
  try {
    await companyService.registerCompany(req.body); 

    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ message: 'Error registering company' });
  }
});

router.get('/companies', async (req, res) => {
  try {
    const company = await companyService.getAll();
    res.status(200).json(company);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Get a specific tblEmpresa_Iso by ID
router.get('/company/:id', async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'company not found' });
    }
    res.status(200).json(empresaIso);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});



module.exports = router;
