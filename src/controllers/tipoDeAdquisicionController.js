const express = require('express');
const router = express.Router();
const tipoDeAdquisicionService = require('../services/tipoDeAdquisicionService');

router.post('/', async (req, res) => {
  try {
    await tipoDeAdquisicionService.createTipoDeAdquisicion(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await tipoDeAdquisicionService.getAllTipoDeAdquisicion(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await tipoDeAdquisicionService.getTipoDeAdquisicionById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await tipoDeAdquisicionService.deleteTipoDeAdquisicion(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
