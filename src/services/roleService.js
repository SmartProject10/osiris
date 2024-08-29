const Role = require("../model/roleSchema");

const createRole = async (req, res) => {
  try {
    const { vName } = req.body;

    // Check if the role vName already exists
    const existingRole = await Role.findOne({ vName });
    if (existingRole) {
      return res.status(400).json({ error: "Role vName already exists" });
    }

    // Create a new role
    const newRole = new Role({ vName });

    // Save the role to the database
    await newRole.save();

    // Respond with the created role
    res.status(201).json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { vName } = req.body;

    // Check if the role vName already exists
    const existingRole = await Role.findOne({ vName });
    if (existingRole && existingRole._id.toString() !== id) {
      return res.status(400).json({ error: "Role vName already exists" });
    }

    // Find the role by ID and update it
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { vName },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Respond with the updated role
    res.status(200).json(updatedRole);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: error.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the role by ID
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Respond with the found role
    res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    // Find all roles
    const roles = await Role.find();

    // Respond with the list of roles
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  updateRole,
  getRoleById,
  getAllRoles,
};
