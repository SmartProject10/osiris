const datoEmpresa = require('../model/datoEmpresaSchema');

const createDatoEmpresa = async (req, res) => {
  const datoEmpresa = new datoEmpresa(req.body);
  try {
    await datoEmpresa.save();
    res.status(201).json({ message: 'Dato de empresa creado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllDatoEmpresa = async (req, res) => {
    try {
      const datoEmpresa = await datoEmpresa.find();
      res.status(200).json(datoEmpresa);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getDatoEmpresaById = async (req, res) => {
  const datoEmpresaId = req.params.id;
  try {
    const datoEmpresa = await datoEmpresa.findById(datoEmpresaId);
    if (!datoEmpresa) {
      return res.status(404).json({ message: 'Dato de empresa no encontrado' });
    }
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteDatoEmpresa = async (req, res) => {
  const datoEmpresaId = req.params.id;
  try {
    await datoEmpresa.findByIdAndDelete(datoEmpresaId);
    res.status(200).json({ message: 'Dato empresa eliminado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createDatoEmpresa,
    getAllDatoEmpresa,
    getDatoEmpresaById,
    deleteDatoEmpresa
};
