const adquisicionEmpresa = require('../model/adquisicionEmpresaSchema');

const createAdquisicionEmpresa = async (req, res) => {
  const newAdquisicionEmpresa = new adquisicionEmpresa(req.body);
  try {
    await newAdquisicionEmpresa.save();
    res.status(201).json({ message: 'Adquisición creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllAdquisicionEmpresa = async (req, res) => {
    try {
      const adquisicion = await adquisicionEmpresa.find();
      res.status(200).json(adquisicion);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getAdquisicionEmpresaById = async (req, res) => {
  const adquisicionEmpresaId = req.params.id;
  try {
    const adquisicion = await adquisicionEmpresa.findById(adquisicionEmpresaId);
    if (!adquisicion) {
      return res.status(404).json({ message: 'Adquisición no encontrada' });
    }
    res.status(201).json(adquisicion);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteAdquisicionEmpresa = async (req, res) => {
  const adquisicionEmpresaId = req.params.id;
  try {
    await adquisicionEmpresa.findByIdAndDelete(adquisicionEmpresaId);
    res.status(200).json({ message: 'Adquisición eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createAdquisicionEmpresa,
    getAllAdquisicionEmpresa,
    getAdquisicionEmpresaById,
    deleteAdquisicionEmpresa
};
