const Sede = require('../model/sedeSchema');

const createSede = async (data) => {
  const newSede = new Sede(data);
  return await newSede.save();
    // res.status(201).json({ message: 'Sede created successfully' });
};

const getSedeById = async (req, res) => {
  const SedeId = req.params.id;
  try {
    const Sede = await Sede.findById(SedeId);
    if (!Sede) {
      return res.status(404).json({ message: 'Sede not found' });
    }
    res.status(200).json(Sede);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getAllSedes = async () => {
//   try {
//     return await Sede.find();
//     // res.status(200).json(Sedes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getAllSedes = async (req, res) => {
  try {
    const Sedes = await Sede.find();
    res.status(200).json(Sedes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSede = async (req, res) => {
  const SedeId = req.params.id;
  const updatedSede = req.body;
  try {
    const Sede = await Sede.findByIdAndUpdate(SedeId, updatedSede, { new: true });
    if (!Sede) {
      return res.status(404).json({ message: 'Sede not found' });
    }
    res.status(200).json(Sede);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSede = async (req, res) => {
  const SedeId = req.params.id;
  try {
    await Sede.findByIdAndDelete(SedeId);
    res.status(200).json({ message: 'Sede deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSede,
  getSedeById,
  getAllSedes,
  updateSede,
  deleteSede,
};
