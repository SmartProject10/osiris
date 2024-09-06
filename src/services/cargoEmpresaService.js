const Cargo = require('../model/cargoEmpresaSchema');
const mongoose = require('mongoose');

const createCargo = async (req, res) => {
  const newCargo = new Cargo(req.body);
  try {
    await newCargo.save();
    res.status(201).json({ message: 'Cargo created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getCargoById = async (req, res) => {
  const CargoId = req.params.id;
  try {
    const Cargo = await Cargo.findById(CargoId);
    if (!Cargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.status(200).json(Cargo);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getCargoByIdarea = async (filtros) => {
  const query = {};
  query.iId_AreaEmpresa = new mongoose.Types.ObjectId(filtros.iId_AreaEmpresa);
  
  try {
    return await Cargo.find(query);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllCargos = async (req, res) => {
  try {
    const Cargos = await Cargo.find();
    res.status(200).json(Cargos);
  } catch (error) { 
    // res.status(error.statusCode || 500).json({ error: error.message });
    console.log(error);
  }
};

const updateCargo = async (req, res) => {
  const CargoId = req.params.id;
  const updatedCargo = req.body;
  try {
    const Cargo = await Cargo.findByIdAndUpdate(CargoId, updatedCargo, { new: true });
    if (!Cargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.status(200).json(Cargo);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteCargo = async (req, res) => {
  const CargoId = req.params.id;
  try {
    await Cargo.findByIdAndDelete(CargoId);
    res.status(200).json({ message: 'Cargo deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createCargo,
  getCargoById,
  getAllCargos,
  updateCargo,
  deleteCargo,
  getCargoByIdarea
};
