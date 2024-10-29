const express = require('express');
const router = express.Router();
const paisService = require('../services/paisService');

router.post('/', async (req, res) => {
  try {
    await paisService.createPais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await paisService.getAllPais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await paisService.getAllPais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/paisesconisoshabilitadas', async (req, res) => {
  try {
    await paisService.getAllPaisesConIsos(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await paisService.deletePais(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
