const express = require('express');
const router = express.Router();
const objetivoGeneralService = require('../services/objetivoGeneralService');

router.post('/', async (req, res) => {
  try {
    await objetivoGeneralService.createobjetivoGeneral(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

router.get('/', async (req, res) => {
  try {
    await objetivoGeneralService.getAllobjetivoGenerales(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await objetivoGeneralService.getobjetivoGeneralById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await objetivoGeneralService.deleteobjetivoGeneral(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});


module.exports = router;
