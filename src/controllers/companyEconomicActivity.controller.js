const express = require('express');
const CompanyEconomicActivity = require('../model/companySchema');
const Company = require('../model/companySchema'); 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { iIdEmpresa, iId_ActEconomica, iId_Estado } = req.body;

    // Check if the company exists
    const company = await Company.findById(iIdEmpresa);
    if (!company) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const newActivity = new CompanyEconomicActivity({
      iIdEmpresa,
      iId_ActEconomica,
      iId_Estado,
    });

    await newActivity.save();

    res.status(201).json({ message: 'Company economic activity registered successfully' });
  } catch (error) {
    console.error('Error registering company economic activity:', error);
    res.status(500).json({ message: 'Error registering company economic activity' });
  }
});

module.exports = router;
