const express = require('express');
const router = express.Router();
const objetivoEspecificoService = require('../services/objetivoEspecificoService');

router.post('/', async (req, res) => {
  try {
    await objetivoEspecificoService.createobjetivoEspecifico(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await objetivoEspecificoService.getAllobjetivoEspecificos(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await objetivoEspecificoService.getobjetivoEspecificoById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await objetivoEspecificoService.deleteobjetivoEspecifico(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
