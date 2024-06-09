// src/controllers/userController.js
const userService = require('../services/userService');

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
