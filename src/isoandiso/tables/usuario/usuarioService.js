const usuarioSchema = require('./usuarioSchema');
const bcrypt = require('bcryptjs');
const { createUserToken } = require('../../../token/jwt.js');

//TOKEN

const register = async (req) => {
  const { nombre, apellido, email, contraseña } = req.body;
  const passwordHash = await bcrypt.hash(contraseña, 10);
  const newUser = new usuarioSchema({ nombre, apellido, email, contraseña: passwordHash });
  const userSaved = await newUser.save();
  const userObject = userSaved.toObject();
  delete userObject.contraseña;
  const token = createUserToken({ id: userObject._id });
  return { token, usuario: userObject};
};

const login = async (req) => {
  const { email, contraseña } = req.body;
  const usuario = await usuarioSchema.findOne({ email });
  if (!usuario) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!isMatch) {
    const error = new Error("Algunos de los datos son incorrectos o no está registrado");
    error.statusCode = 400;
    throw error;
  }
  const userObject = usuario.toObject();
  delete userObject.contraseña;
  const token = createUserToken({ id: userObject._id });
  return { token, usuario: userObject };
};

const profile = async (req) => {
  const usuario = await usuarioSchema.findById(req.profile.id);
  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const userObject = usuario.toObject();
  delete userObject.contraseña;
  return userObject;
};

//COMMONS

const getAllUsers = async (req, res) => {
  const usuarios = await usuarioSchema.find();
  return usuarios
};

const getUserById = async (req, res) => {
  const usuarioId = req.params.id;
  const usuario = await usuarioSchema.findById(usuarioId);
  return usuario;
};

const updateUser = async (req) => {
  const { contraseña, ...usuario } = req.body;
  if (contraseña) {
    usuario.contraseña = await bcrypt.hash(contraseña, 10);
  }
  const usuarioEncontrado = await usuarioSchema.findByIdAndUpdate(
    req.params.id,
    { $set: usuario },
    { new: true }
  );
  if (!usuarioEncontrado) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return usuarioEncontrado;
};

const deleteUser = async (req, res) => {
  const usuarioId = req.params.id;
  await usuarioSchema.findByIdAndDelete(usuarioId);
};

module.exports = {
  register,
  login,
  profile,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};
