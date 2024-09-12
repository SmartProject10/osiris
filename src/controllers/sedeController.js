const express = require('express');
const router = express.Router();
const sedeService = require('../services/sedeService'); // Assuming you have an sede.service module

// Create sede record
// const crearsede = async (req, res) => {
//   try {
//     const sedeData = req.body; 
//     const createdsede = await sedeService.createSede(sedeData);
//     res.status(201).json(createdsede); 
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

router.post('/', async (req, res) => {
  try {
    await sedeService.createSede(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read sede record by ID
router.get('/:id', async (req, res) => {
  try {
    await sedeService.getSedeById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update sede record
router.put('/:id', async (req, res) => {
  try {
    await sedeService.updateSede(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    await sedeService.getAllSedes(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Delete sede record
router.delete('/:id', async (req, res) => {
  try {
    await sedeService.deleteSede(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});


module.exports = router;
