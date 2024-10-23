const express = require('express');
const router = express.Router();
const actividadService = require('../services/actividadService');

router.post('/', async (req, res) => {
  try {
    await actividadService.createactividad(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await actividadService.getAllactividades(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await actividadService.getactividadById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await actividadService.deleteactividad(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
