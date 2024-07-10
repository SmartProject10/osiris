const Iso = require('../models/iso.model');

const createIso = async (req, res) => {
  const newIso = new Iso(req.body);
  try {
    await newIso.save();
    res.status(201).json({ message: 'ISO created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIsoById = async (req, res) => {
  const isoId = req.params.id;
  try {
    const iso = await Iso.findById(isoId);
    if (!iso) {
      return res.status(404).json({ message: 'ISO not found' });
    }
    res.status(200).json(iso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllIsos = async (req, res) => {
  try {
    const isos = await Iso.find();
    res.status(200).json(isos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIso = async (req, res) => {
  const isoId = req.params.id;
  const updatedIso = req.body;
  try {
    const iso = await Iso.findByIdAndUpdate(isoId, updatedIso, { new: true });
    if (!iso) {
      return res.status(404).json({ message: 'ISO not found' });
    }
    res.status(200).json(iso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIso = async (req, res) => {
  const isoId = req.params.id;
  try {
    await Iso.findByIdAndDelete(isoId);
    res.status(200).json({ message: 'ISO deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIso,
  getIsoById,
  getAllIsos,
  updateIso,
  deleteIso,
};
