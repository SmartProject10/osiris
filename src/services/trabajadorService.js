const Trabajador = require('../model/trabajadorSchema');

const createTrabajador = async (data) => {
  const newTrabajador = new Trabajador(data);
  return await newTrabajador.save();
};

const getTrabajadorById = async (id) => {
  return await Trabajador.findById(id);
};

const getAllTrabajadores = async () => {
  return await Trabajador.find({});
};

const updateTrabajador = async (id, data) => {
  return await Trabajador.findByIdAndUpdate(id, data, { new: true });
};

const deleteTrabajador = async (id) => {
  return await Trabajador.findByIdAndDelete(id);
};

module.exports = {
  createTrabajador,
  getTrabajadorById,
  getAllTrabajadores,
  updateTrabajador,
  deleteTrabajador
};
