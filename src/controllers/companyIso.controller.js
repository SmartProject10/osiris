const express = require('express');
const router = express.Router();
const CompanyIsoService = require('../services/companyIso.service');
const empresaService = require('../services/companyService');

// Create a new tblEmpresa_Iso
router.post('/', async (req, res) => {
  try {
    const newEmpresaIso = await tblEmpresaIsoService.createEmpresaIso(req.body);
    res.status(201).json(newEmpresaIso);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Get all tblEmpresa_Iso
router.get('/', async (req, res) => {
  try {
    const empresaIsoList = await tblEmpresaIsoService.getAllEmpresaIso();
    res.status(200).json(empresaIsoList);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Get a specific tblEmpresa_Iso by ID
router.get('/:id', async (req, res) => {
  try {
    const empresaIso = await tblEmpresaIsoService.getEmpresaIsoById(req.params.id);
    if (!empresaIso) {
      return res.status(404).json({ message: 'tblEmpresa_Iso not found' });
    }
    res.status(200).json(empresaIso);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Update a tblEmpresa_Iso by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEmpresaIso = await tblEmpresaIsoService.updateEmpresaIso(req.params.id, req.body);
    if (!updatedEmpresaIso) {
      return res.status(404).json({ message: 'tblEmpresa_Iso not found' });
    }
    res.status(200).json(updatedEmpresaIso);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await tblEmpresaIsoService.deleteEmpresaIso(req.params.id);
    res.status(200).json({ message: 'tblEmpresa_Iso deleted' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


exports.getCompany = async (req, res) => {
    try {
        const company = await empresaService.getUserById(req.params.id);
        res.json(company);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = router;
