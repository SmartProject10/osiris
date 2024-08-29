const express = require('express');
const router = express.Router();
const roleService = require('../services/roleService');

// Create a new role position
router.post('/', async (req, res) => {
  try {
    await roleService.createRole(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

});

// Read all role positions
router.get('/', async (req, res) => {
  try {
    await roleService.getAllRoles(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Read a specific role position by ID
router.get('/:id', async (req, res) => {
  try {
    await roleService.getRoleById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update a specific role position
router.put('/:id', async (req, res) => {
  try {
    await roleService.updateRole(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error  : error.message });
  }

});


module.exports = router;
