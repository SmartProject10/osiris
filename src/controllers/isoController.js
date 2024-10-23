const express = require('express');
const router = express.Router();
const isoService = require('../services/isoService');

router.post('/', async (req, res) => {
  try {
    await isoService.createiso(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await isoService.getAllisos(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await isoService.getisoById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await isoService.deleteiso(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
