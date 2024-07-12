const express = require('express');
const router = express.Router();
const userService = require('../services/userService'); 

// Create user route
router.post('/users', async (req, res) => {
  try {
    await userService.createUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get user by ID route
router.get('/users/:id', async (req, res) => {
  try {
    await userService.getUserById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get all users route (be cautious with large datasets)
router.get('/users', async (req, res) => {
  try {
    await userService.getAllUsers(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update user route
router.put('/users/:id', async (req, res) => {
  try {
    await userService.updateUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Delete user route
router.delete('/users/:id', async (req, res) => {
  try {
    await userService.deleteUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = router;
