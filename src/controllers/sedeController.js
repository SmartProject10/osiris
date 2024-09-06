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
    const sedeData = req.body; // Extract sede data from request body
    await sedeService.createSede(sedeData);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read sede record by ID
router.get('/:id', async (req, res) => {
  try {
    const sedeId = req.params.id; // Get sede ID from request parameters
    const sedeRecord = await sedeService.getSedeById(sedeId);
    if (!sedeRecord) {
      return res.status(404).json({ message: 'sede record not found' });
    }
    res.json(sedeRecord); // Send sede record in response
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update sede record
router.put('/:id', async (req, res) => {
  try {
    const sedeId = req.params.id; // Get sede ID from request parameters
    const sedeData = req.body; // Extract updated sede data from request body
    const updatedsede = await sedeService.updateSede(sedeId, sedeData);
    if (!updatedsede) {
      return res.status(404).json({ message: 'sede record not found' });
    }
    res.json(updatedsede); // Send updated sede record in response
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// const getAll = async (req, res) => {
//     try {
//       const sedeRecord = await sedeService.getAllSedes();
//       res.json(sedeRecord); // Send sede record in response
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

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
    const sedeId = req.params.id; // Get sede ID from request parameters
    await sedeService.deleteSede(sedeId);
    res.status(204).json(); // Send no content response on successful deletion
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Error handling function (example)
// function handleError(error, res) {
//   console.error(error);
//   res.status(500).json({ message: 'Internal server error' });
// }

module.exports = router;

// module.exports = {
//   crearsede,
//   getAll
// }
