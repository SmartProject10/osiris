const express = require('express');
const router = express.Router();
const isoService = require('../services/companyIso.service'); // Assuming you have an iso.service module

// Create ISO record
router.post('/', async (req, res) => {
  try {
    const isoData = req.body; // Extract ISO data from request body
    const createdIso = await isoService.createIso(isoData);
    res.status(201).json(createdIso); // Send created ISO record in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Read ISO record by ID
router.get('/:id', async (req, res) => {
  try {
    const isoId = req.params.id; // Get ISO ID from request parameters
    const isoRecord = await isoService.getIsoById(isoId);
    if (!isoRecord) {
      return res.status(404).json({ message: 'ISO record not found' });
    }
    res.json(isoRecord); // Send ISO record in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

// Update ISO record
router.put('/:id', async (req, res) => {
  try {
    const isoId = req.params.id; // Get ISO ID from request parameters
    const isoData = req.body; // Extract updated ISO data from request body
    const updatedIso = await isoService.updateIsoById(isoId, isoData);
    if (!updatedIso) {
      return res.status(404).json({ message: 'ISO record not found' });
    }
    res.json(updatedIso); // Send updated ISO record in response
  } catch (error) {
    handleError(error, res); // Handle any errors that occur
  }
});

router.get('/', async (req, res) => {
    try {
      const isoRecord = await isoService.getAllIsos();
      if (!isoRecord) {
        return res.status(404).json({ message: 'ISO record not found' });
      }
      res.json(isoRecord); // Send ISO record in response
    } catch (error) {
      handleError(error, res); // Handle any errors that occur
    }
  });

// Delete ISO record
router.delete('/:id', async (req, res) => {
  try {
    const isoId = req.params.id; // Get ISO ID from request parameters
    await isoService.deleteIsoById(isoId);
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
