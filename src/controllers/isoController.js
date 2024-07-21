const express = require('express');
const router = express.Router();
const isoService = require('../services/companyIso.service'); // Assuming you have an iso.service module

// Create ISO record
router.post('/', async (req, res) => {
  try {
    await isoService.createIso(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read ISO record by ID
router.get('/:id', async (req, res) => {
  try {
    await isoService.getIsoById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update ISO record
router.put('/:id', async (req, res) => {
  try {
    await isoService.updateIso(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await isoService.getAllIsos(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

  });

// Delete ISO record
router.delete('/:id', async (req, res) => {
  try {
    await isoService.deleteIso(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Error handling function (example)
function handleError(error, res) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = router;
