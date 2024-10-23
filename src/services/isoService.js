const isoSchema = require('../model/IsoSchema');

const createiso = async (req, res) => {
  const newiso = new isoSchema(req.body);
  try {
    await newiso.save();
    res.status(201).json({ message: 'iso creada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllisos = async (req, res) => {
    try {
      const isos = await isoSchema.find();
      res.status(200).json(isos);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getisoById = async (req, res) => {
  const isoId = req.params.id;
  try {
    const iso = await isoSchema.findById(isoId);
    if (!iso) {
      return res.status(404).json({ message: 'iso no encontrada' });
    }
    res.status(201).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteiso = async (req, res) => {
  const isoId = req.params.id;
  try {
    await isoSchema.findByIdAndDelete(isoId);
    res.status(200).json({ message: 'iso eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createiso,
  getAllisos,
  getisoById,
  deleteiso
};
