const express = require('express');
const router = express.Router();
const subempresaService = require('../services/subempresaService');

router.post('/', async (req, res) => {
  try {
    await subempresaService.createSubempresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await subempresaService.getAllSubempresas(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await subempresaService.getSubempresaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await subempresaService.deleteSubempresa(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
