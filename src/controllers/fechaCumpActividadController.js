const express = require('express');
const router = express.Router();
const fechaCumpActividadService = require('../services/fechaCumpActividadService');

router.post('/', async (req, res) => {
  try {
    await fechaCumpActividadService.createfechaCumpActividad(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
    try {
    await fechaCumpActividadService.getAllfechaCumpActividades(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await fechaCumpActividadService.getfechaCumpActividadById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await fechaCumpActividadService.deletefechaCumpActividad(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
