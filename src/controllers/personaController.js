const express = require('express');
const router = express.Router();
const personaService = require('../services/personaService'); 

// Create Persona route
router.post('/', async (req, res) => {
  try {
    await personaService.createPersona(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get Persona by ID route
router.get('/:id', async (req, res) => {
  try {
    await personaService.getPersonaById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get all Personas route (be cautious with large datasets)
router.get('/', async (req, res) => {
  try {
    await personaService.getAllPersonas(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update Persona route
router.put('/:id', async (req, res) => {
  try {
    await personaService.updatePersona(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Delete Persona route
router.delete('/:id', async (req, res) => {
  try {
    await personaService.deletePersona(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = router;
