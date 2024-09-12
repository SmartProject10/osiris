const Sede = require('../model/sedeSchema');
const { MongoClient, ObjectId } = require('mongodb');

const createSede = async (req, res) => {
  const newSede = new Sede(req.body);
  try {
    await newSede.save();
    res.status(201).json({ message: 'Sede created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getSedeById = async (req, res) => {
  const SedeId = req.params.id;
  try {
    const Sedes = await Sede.findById(SedeId);
    if (!Sedes) {
      return res.status(400).json({ message: 'Sede not found' });
    }
    res.status(201).json(Sedes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSedes = async (req, res) => {
  try {
    const Sedes = await Sede.find();
    res.status(201).json(Sedes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSede = async (req, res) => {
  const SedeId = req.params.id;
  const updatedSede = req.body;
  try {
    const filter = { _id: new ObjectId(SedeId) };
    const Sedes = await Sede.findOneAndUpdate(
      filter,
      { $set: updatedSede },
      { returnDocument: 'after' }
    );
    console.log(Sedes);
    
    if (!Sedes) {
      return res.status(400).json({ message: 'Sede not found' });
    }
    res.status(201).json({ message: 'Sede edit successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSede = async (req, res) => {
  const SedeId = req.params.id;
  try {
    await Sede.findByIdAndDelete(SedeId);
    res.status(201).json({ message: 'Sede deleted successfully' });
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
