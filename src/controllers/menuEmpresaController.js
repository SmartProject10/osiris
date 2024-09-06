const express = require('express');
const router = express.Router();
const menuEmpresaService = require('../services/menuEmpresaService'); // Assuming you have a service module

// Create a new company position
router.post('/', async (req, res) => {
    try {
      await menuEmpresaService.createMenu(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  
  });
  
  // Read all company positions
  router.get('/', async (req, res) => {
    try {
      await menuEmpresaService.getAllMenu(req, res);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });
  
module.exports = router;