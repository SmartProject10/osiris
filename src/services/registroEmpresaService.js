const registroEmpresa = require('../model/registroEmpresaSchema');
const { createAccessToken } = require('../lib/jwt.js');
const jwt = require('jsonwebtoken');

const createEmpresa = async (req, res) => {
 
  try {
    const newEmpresa = new registroEmpresa(req.body);
   const newEmpresaa= await newEmpresa.save();
   const token = await createAccessToken({ id: newEmpresaa._id });
   res.json({
    token: token,
    message: 'Empresa creada correctamente',
  });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllEmpresa = async (req, res) => {
    try {
      const empresas = await registroEmpresa.find();
      res.status(200).json(empresas);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getEmpresaById = async (req, res) => {
  const empresaId = req.params.id;
  try {
    const empresa = await registroEmpresa.findById(empresaId);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(201).json(Empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteEmpresa = async (req, res) => {
  const empresaId = req.params.id;
  try {
    await registroEmpresa.findByIdAndDelete(empresaId);
    res.status(200).json({ message: 'Empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createEmpresa,
    getAllEmpresa,
    getEmpresaById,
    deleteEmpresa
};
