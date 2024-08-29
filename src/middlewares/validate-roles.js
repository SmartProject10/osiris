const mongoose = require("mongoose");
const User = require("../model/userSchema");

const checkAdminOrSelf = async (req, res, next) => {
  const userId = req.params.id;

  try {
    // Validación del ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Encontrar al usuario solicitante y poblar roles
    const requestingUser = await User.findById(userId);

    if (!requestingUser) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    // Verificar si el usuario solicitante es admin o el mismo usuario
    const isAdmin = requestingUser.hasRole("admin");
    const isSameUser = requestingUser._id.equals(userId);

    if (!isAdmin && !isSameUser) {
      return res
        .status(403)
        .json({
          message: "Access denied. Admins or the user themselves only.",
        });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkEmailAdminOrSelf = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the requesting user and populate roles
    const requestingUser = await User.findOne({ email });

    if (!requestingUser) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    // Check if the requesting user is admin or the same user
    const isAdmin = requestingUser.hasRole("admin");
    const isSameUser = requestingUser.email === email;

    if (!isAdmin && !isSameUser) {
      return res
        .status(403)
        .json({
          message: "Access denied. Admins or the user themselves only.",
        });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateAdminAccess = async (req, res, next) => {
  const userId = req.params.id;

  try {
    // Validación del ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Get the user making the request
    const requestingUser = await User.findById(userId);

    if (!requestingUser) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    // Validate if the user making the request is an administrator
    const isAdmin = await requestingUser.hasRole("admin");

    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  checkAdminOrSelf,
  checkEmailAdminOrSelf,
  validateAdminAccess,
};
