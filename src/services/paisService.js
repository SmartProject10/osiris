const Pais = require('../model/paisSchema');

const createPais = async (req, res) => {
  const newPais = new Pais(req.body);
  try {
    await newPais.save();
    res.status(201).json({ message: 'Pais created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaisById = async (req, res) => {
  const PaisId = req.params.id;
  try {
    const Pais = await Pais.findById(PaisId);
    if (!Pais) {
      return res.status(404).json({ message: 'Pais not found' });
    }
    res.status(200).json(Pais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPais = async (req, res) => {
  try {
    const Paiss = await pool.getCollection('Pais').find({});
    res.status(200).json(Paiss);
  } catch (error) {
    // res.json({ error: error.message });
    console.log(error);
  }
};

const updatePais = async (req, res) => {
  const PaisId = req.params.id;
  const updatedPais = req.body;
  try {
    const Pais = await Pais.findByIdAndUpdate(PaisId, updatedPais, { new: true });
    if (!Pais) {
      return res.status(404).json({ message: 'Pais not found' });
    }
    res.status(200).json(Pais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePais = async (req, res) => {
  const PaisId = req.params.id;
  try {
    await Pais.findByIdAndDelete(PaisId);
    res.status(200).json({ message: 'Pais deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPais,
  getPaisById,
  getAllPais,
  updatePais,
  deletePais,
};
