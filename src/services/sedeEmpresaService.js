const sedeEmpresa = require('../model/sedeEmpresaSchema');

const createSedeEmpresa = async (req, res) => {
  const sede = new sedeEmpresa(req.body);
  try {
    await sede.save();
    res.status(201).json({ message: 'Sede creada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllSedeEmpresa = async (req, res) => {
    try {
      const sede = await sedeEmpresa.find();
      res.status(200).json(sede);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getSedeEmpresaById = async (req, res) => {
  const sedeEmpresaId = req.params.id;
  try {
    const sede = await sedeEmpresa.findById(sedeEmpresaId);
    if (!sede) {
      return res.status(404).json({ message: 'Sede no encontrada' });
    }
    res.status(201).json(sede);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteSedeEmpresa = async (req, res) => {
  const sede = req.params.id;
  try {
    await sedeEmpresa.findByIdAndDelete(sede);
    res.status(200).json({ message: 'Sede eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createSedeEmpresa,
    getAllSedeEmpresa,
    getSedeEmpresaById,
    deleteSedeEmpresa
};
