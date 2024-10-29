const isoSchema = require('../model/isoSchema');

const createIso = async (req, res) => {
  const newIso = new isoSchema(req.body);
  try {
    await newIso.save();
    res.status(201).json({ message: 'Iso creada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllIso = async (req, res) => {
    try {
      const isos = await isoSchema.find();
      res.status(200).json(isos);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getIsoById = async (req, res) => {
  const isoId = req.params.id;
  try {
    const iso = await isoSchema.findById(isoId);
    if (!iso) {
      return res.status(404).json({ message: 'Iso no encontrada' });
    }
    res.status(201).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteIso = async (req, res) => {
  const isoId = req.params.id;
  try {
    await isoSchema.findByIdAndDelete(isoId);
    res.status(200).json({ message: 'Iso eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createIso,
    getAllIso,
    getIsoById,
    deleteIso
};