const express = require('express');
const router = express.Router();
const sedeEmpresaService = require('../services/sedeEmpresaService');

router.post('/', async (req, res) => {
  try {
    await sedeEmpresaService.createSedeEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await sedeEmpresaService.getAllSedeEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await sedeEmpresaService.getSedeEmpresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await sedeEmpresaService.deleteSedeEmpresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
