
const express = require('express');
const CompanyControllers = require('../controllers/CompanyController');
// const companyEconomicActivityRouter = require('../controllers/companyEconomicActivity.controller');
// const companyIsoRouter = require('../controllers/companyIso.controller')
const router = express.Router();



// POST /companies
router.post('/companies', (req, res) => {
  CompanyControllers.create(req, res)
    .then(() => res.status(201).json({ message: 'Company created successfully' }))
    .catch(error => res.status(500).json({ error: error.message }));
});

// GET /companies
router.get('/companies', (req, res) => {
  CompanyControllers.findAll(req, res)
    .then(companies => res.json(companies))
    .catch(error => res.status(500).json({ error: error.message }));
});

// GET /companies/:id
router.get('/companies/:id', (req, res) => {
  CompanyControllers.findById(req, res)
    .then(company => {
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.json(company);
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

// PUT /companies/:id
router.put('/companies/:id', (req, res) => {
  CompanyControllers.update(req, res)
    .then(company => res.json(company))
    .catch(error => res.status(500).json({ error: error.message }));
});

// DELETE /companies/:id
router.delete('/companies/:id', (req, res) => {
  CompanyControllers.delete(req, res)
    .then(() => res.json({ message: 'Company deleted successfully' }))
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;


