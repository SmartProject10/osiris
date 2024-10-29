const paisSchema = require('../model/paisSchema');

const createPais = async (req, res) => {
  const newPais = new paisSchema(req.body);
  try {
    await newPais.save();
    res.status(201).json({ message: 'País creado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllPais = async (req, res) => {
    try {
      const paises = await paisSchema.find();
      res.status(200).json(paises);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
};

const getAllPaisesConIsos = async (req, res) => {
    try {
      const paisesConIsos = await paisSchema.find({ isosHabilitadas: { $ne: null } }).populate('isosHabilitadas');
      res.status(200).json(paisesConIsos);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
};

const getPaisById = async (req, res) => {
  const paisId = req.params.id;
  try {
    const pais = await paisSchema.findById(paisId);
    if (!pais) {
      return res.status(404).json({ message: 'Pais no encontrado' });
    }
    res.status(201).json(pais);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deletePais = async (req, res) => {
  const paisId = req.params.id;
  try {
    await paisSchema.findByIdAndDelete(paisId);
    res.status(200).json({ message: 'Pais eliminado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createPais,
    getAllPais,
    getAllPaisesConIsos,
    getPaisById,
    deletePais
};
