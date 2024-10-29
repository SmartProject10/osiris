const empresaSchema = require('../model/empresaSchema');
const { createAccessToken } = require('../lib/jwt.js');

const createEmpresa = async (req, res) => {
  try {
    const newEmpresa = new empresaSchema(req.body);
    const newEmpresaa= await newEmpresa.save();
    const token = await createAccessToken({ id: newEmpresaa._id });
    res.json({
      token: token,
      message: 'Empresa creada correctamente',
  });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

const getAllEmpresa = async (req, res) => {
    try {
      const empresas = await empresaSchema.find();
      res.status(200).json(empresas);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getEmpresaById = async (req, res) => {
  const empresaId = req.params.id;
  try {
    const empresa = await empresaSchema.findById(empresaId);
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(201).json(empresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteEmpresa = async (req, res) => {
  const empresaId = req.params.id;
  try {
    await empresaSchema.findByIdAndDelete(empresaId);
    res.status(200).json({ message: 'Empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllAreasEmpresa = async (req, res) => {
  const empresaId = req.params.id;
  try {
    const empresa = await empresaSchema.findById(empresaId).populate('areaEmpresaIds')
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(empresa.areaEmpresaIds); // Atención: gracias a 'populate('areaEmpresaIds')' estamos devolviendo no solo los ID de las áreas sino también los demás campos
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createEmpresa,
    getAllEmpresa,
    getEmpresaById,
    deleteEmpresa,
    getAllAreasEmpresa
};