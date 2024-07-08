// src/controllers/userController.js
const userService = require('../services/userService');
const express = require('express');
const router = express.Router();

// exports.getUser = async (req, res) => {
//     try {
//         const user = await userService.getUserById(req.params.id);
//         res.json(user);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

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

  module.exports = router;