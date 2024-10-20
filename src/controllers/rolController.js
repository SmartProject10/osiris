const Rol = require('../model/rolUsuarioSchema.js');

const createRole = async (req, res) => {
  const rol = new Rol(req.body);
  try {
    await rol.save();
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}


const getAllRol = async (req, res) => {
  try {
    const Rol = await Rol.find();
    res.status(200).json(Rol);
  } catch (error) { 
    // res.status(error.statusCode || 500).json({ error: error.message });
    console.log(error);
  }
};

const getRolById = async (req, res) => {
const RolId = req.params.id;
try {
  const Rol = await Rol.findById(RolId);
  if (!Rol) {
    return res.status(404).json({ message: 'Role not found' });
  }
  res.status(201).json(company);
} catch (error) {
  res.status(error.statusCode || 500).json({ error: error.message });
}
};

const deleteRol = async (req, res) => {
const Rol = req.params.id;
try {
  await Rol.findByIdAndDelete(Rol);
  res.status(200).json({ message: 'Role deleted successfully' });
} catch (error) {
  res.status(error.statusCode || 500).json({ error: error.message });
}
};

module.exports = {
  createRole
};