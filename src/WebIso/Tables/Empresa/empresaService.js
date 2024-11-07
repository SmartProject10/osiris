const empresaSchema = require('./empresaSchema.js');
const bcrypt = require('bcryptjs');
const { createCompanyToken } = require('../../../Token/jwt.js');

//TOKEN

const register = async (req) => {
  const { email, telefono, contraseña } = req.body;
  const passwordHash = await bcrypt.hash(contraseña, 10);
  const newCompany = new empresaSchema({ email, telefono, contraseña: passwordHash });
  const companySaved = await newCompany.save();
  const token = createCompanyToken({ id: companySaved._id });
  return { token, empresa: companySaved};
};

const login = async (req) => {
  const { email, contraseña } = req.body;
  const empresa = await empresaSchema.findOne({ email });
  if (!empresa) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(contraseña, empresa.contraseña);
  if (!isMatch) {
    const error = new Error("Contraseña incorrecta");
    error.statusCode = 400;
    throw error;
  }
  const token = createCompanyToken({ id: empresa._id });
  return { token, empresa: empresa };
};

const logout = async (res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true });
};

const profile = async (req) => {
  const empresa = await empresaSchema.findById(req.profile.id);
  if (!empresa) {
    const error = new Error("Empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return {
    id: empresa._id,
    email: empresa.email,
    createdAt: empresa.createdAt,
    updatedAt: empresa.updatedAt,
  };
};

//COMMONS

const getAllCompanies = async (req, res) => {
  const empresa = await empresaSchema.find();
  return empresa
};

const getCompanyById = async (req, res) => {
  const empresaId = req.params.id;
  const empresa = await empresaSchema.findById(empresaId);
  return empresa;
};

const updateCompanyById = async (req) => {
  const { contraseña, ...empresa } = req.body;
  if (contraseña) {
    empresa.contraseña = await bcrypt.hash(contraseña, 10);
  }
  const empresaEncontrada = await empresaSchema.findByIdAndUpdate(
    req.params.id,
    { $set: empresa },
    { new: true }
  );
  if (!empresaEncontrada) {
    const error = new Error("Trabajador no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return empresaEncontrada;
};

const deleteCompanyById = async (req, res) => {
  const empresaId = req.params.id;
  await empresaSchema.findByIdAndDelete(empresaId);
};

module.exports = {
  register,
  login,
  logout,
  profile,
  getCompanyById,
  getAllCompanies,
  updateCompanyById,
  deleteCompanyById
};