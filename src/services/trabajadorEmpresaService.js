const trabajadorEmpresa = require('../model/trabajadorEmpresaSchema');

const createTrabajadorEmpresa = async (data) => {
  const newTrabajadorEmpresa = new trabajadorEmpresa(data);
  return await newTrabajadorEmpresa.save();
};

const getTrabajadorEmpresaById = async (id) => {
  return await trabajadorEmpresa.findById(id);
};

const updateTrabajadorEmpresa = async (id, data) => {
  return await trabajadorEmpresa.findByIdAndUpdate(id, data, { new: true });
};

const deleteTrabajadorEmpresa = async (id) => {
  return await trabajadorEmpresa.findByIdAndDelete(id);
};

module.exports = {
  createTrabajadorEmpresa,
  getTrabajadorEmpresaById,
  updateTrabajadorEmpresa,
  deleteTrabajadorEmpresa
};
