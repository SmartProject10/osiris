const trabajadorSubempresa = require('../model/trabajadorSubempresaSchema');

const createTrabajadorSubempresa = async (data) => {
  const newTrabajadorSubempresa = new trabajadorSubempresa(data);
  return await newTrabajadorSubempresa.save();
};

const getTrabajadorSubempresaById = async (id) => {
  return await trabajadorSubempresa.findById(id);
};

const updateTrabajadorSubempresa = async (id, data) => {
  return await trabajadorSubempresa.findByIdAndUpdate(id, data, { new: true });
};

const deleteTrabajadorSubempresa = async (id) => {
  return await trabajadorSubempresa.findByIdAndDelete(id);
};

module.exports = {
  createTrabajadorSubempresa,
  getTrabajadorSubempresaById,
  updateTrabajadorSubempresa,
  deleteTrabajadorSubempresa
};
