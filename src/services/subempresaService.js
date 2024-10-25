const subempresaSchema = require('../model/subempresaSchema');

const createSubempresa = async (req, res) => {
  try {
    const newSubempresa = await new subempresaSchema(req.body).save();
    res.status(201).json(newSubempresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllSubempresas = async (req, res) => {
    try {
      const subempresas = await subempresaSchema.find();
      res.status(200).json(subempresas);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getSubempresaById = async (req, res) => {
  const subempresaId = req.params.id;
  try {
    const subempresa = await subempresaSchema.findById(subempresaId);
    if (!subempresa) {
      return res.status(404).json({ message: 'Subempresa no encontrada' });
    }
    res.status(201).json(subempresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteSubempresa = async (req, res) => {
  const subempresaId = req.params.id;
  try {
    await subempresaSchema.findByIdAndDelete(subempresaId);
    res.status(200).json({ message: 'Subempresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createSubempresa,
  getAllSubempresas,
  getSubempresaById,
  deleteSubempresa
};
