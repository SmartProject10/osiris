const trabajadorSchema = require('./trabajadorSchema.js');
const bcrypt = require('bcryptjs');
const { createWorkerToken } = require('../../../token/jwt.js');

//TOKEN

/*
(el trabajador ya es registrado antes en la tabla desde la página webiso con todos los campos exceptuando los campos "nombre","apellido"
 y "contraseña", los cuales se rellenan desde éste endpoint usado en el registro de la página isoandiso)
*/
const register = async (req) => {
  const { email, nombre, apellido, contraseña } = req.body;
  const trabajador = await trabajadorSchema.findOne({ email });
  if (!trabajador) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const passwordHash = await bcrypt.hash(contraseña, 10);
  trabajador.nombre = nombre;
  trabajador.apellido = apellido;
  trabajador.contraseña = passwordHash;
  const trabajadorActualizado = await trabajador.save();
  const workerObject = trabajadorActualizado.toObject();
  delete workerObject.contraseña;
  const token = createWorkerToken({ id: workerObject._id });
  return { token, trabajador: workerObject};
};

const login = async (req) => {
  const { email, contraseña } = req.body;
  const trabajadorEncontrado = await trabajadorSchema.findOne({ email });
  if (!trabajadorEncontrado) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(contraseña, trabajadorEncontrado.contraseña);
  if (!isMatch) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 400;
    throw error;
  }
  const token = createWorkerToken({ id: trabajadorEncontrado._id });
  const workerObject = trabajadorEncontrado.toObject();
  delete workerObject.contraseña;
  return { token, trabajador: workerObject };
};

const profile = async (req) => {
  const trabajadorEncontrado = await trabajadorSchema.findById(req.profile.id);
  if (!trabajadorEncontrado) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const workerObject = trabajadorEncontrado.toObject();
  delete workerObject.contraseña;
  return workerObject;
};

//COMMONS

const getAllCompanyWorkers = async (req) => {
    const trabajadores = await trabajadorSchema.find();
    return trabajadores
};

const getCompanyWorkerById = async (req) => {
  const trabajadorId = req.params.id;
  const trabajador = await trabajadorSchema.findById(trabajadorId);
  return trabajador;
};

const updateCompanyWorkerById = async (req) => {
  const { contraseña, ...trabajador } = req.body;
  if (contraseña) {
    trabajador.contraseña = await bcrypt.hash(contraseña, 10);
  }
  const trabajadorEncontrado = await trabajadorSchema.findByIdAndUpdate(
    req.params.id,
    { $set: trabajador },
    { new: true }
  );
  if (!trabajadorEncontrado) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return trabajadorEncontrado;
};

const deleteCompanyWorkerById = async (req) => {
  const trabajadorId = req.params.id;
  await trabajadorSchema.findByIdAndDelete(trabajadorId);
};

module.exports = {
  register,
  login,
  profile,
  getAllCompanyWorkers,
  getCompanyWorkerById,
  updateCompanyWorkerById,
  deleteCompanyWorkerById
};
