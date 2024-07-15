const express = require('express');
const router = express.Router();
const paisService = require('../services/paisService'); // Assuming you have an pais.service module

// Create pais record
router.post('/', async (req, res) => {
  try {
    const paisData = req.body; // Extract pais data from request body
    const createdPais = await paisService.createPais(paisData);
    res.status(201).json(createdPais); // Send created pais record in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read pais record by ID
router.get('/:id', async (req, res) => {
  try {
    const paisId = req.params.id; // Get pais ID from request parameters
    const paisRecord = await paisService.getPaisById(paisId);
    if (!paisRecord) {
      return res.status(404).json({ message: 'pais record not found' });
    }
    res.json(paisRecord); // Send pais record in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Update pais record
router.put('/:id', async (req, res) => {
  try {
    const paisId = req.params.id; // Get pais ID from request parameters
    const paisData = req.body; // Extract updated pais data from request body
    const updatedpais = await paisService.updatePais(paisId, paisData);
    if (!updatedpais) {
      return res.status(404).json({ message: 'pais record not found' });
    }
    res.json(updatedpais); // Send updated pais record in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

router.get('/', async (req, res) => {
    try {
      const paisRecord = await paisService.getAllPais();
      if (!paisRecord) {
        return res.status(404).json({ message: 'pais record not found' });
      }
      res.json(paisRecord); // Send pais record in response
    } catch (error) {
      handleError(error, res); // Handle any errors that occur
    }
  });

// Delete pais record
router.delete('/:id', async (req, res) => {
  try {
    const paisId = req.params.id; // Get pais ID from request parameters
    await paisService.deletePais(paisId);
    res.status(204).json(); // Send no content response on successful deletion
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Error handling function (example)
function handleError(error, res) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = router;
