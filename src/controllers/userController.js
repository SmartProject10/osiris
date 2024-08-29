const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const roles = require('../middlewares/validate-roles');

// Create user route
router.post('/', async (req, res) => {
  try {
    await userService.createUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get user by ID route
router.get('/:id', [roles.checkAdminOrSelf], async (req, res) => {
  try {
    await userService.getUserById(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

router.post('/getEmail', [roles.checkEmailAdminOrSelf], async (req, res) => {
  try {
    await userService.getEmail(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Get all users route (be cautious with large datasets)
router.get('/', [roles.validateAdminAccess], async (req, res) => {
  try {
    await userService.getAllUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Update user route
router.put('/:id', [roles.checkAdminOrSelf], async (req, res) => {
  try {
    await userService.updateUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Delete user route
router.delete('/:id', [roles.checkAdminOrSelf], async (req, res) => {
  try {
    await userService.deleteUser(req, res);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = router;
