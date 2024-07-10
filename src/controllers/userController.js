// src/controllers/userController.js
const userService = require('../services/userService');
const express = require('express');
const router = express.Router();

router.get('/user/:id', async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  });

  
  router.get('/user/:id', async (req, res) => {
    // Existing implementation for finding a user by ID
  });
  
  
  router.post('/user', async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser); // Created status code
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  });
  
  // Update a user by ID (assuming update data comes from the request body)
  router.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedUser = await userService.updateUser(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  });
  
  // Delete a user by ID
  router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      await userService.deleteUser(id);
      res.status(204).json(); // No content response for successful deletion
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  