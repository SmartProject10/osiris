const Distrito = require('../model/distritosEmpresaSchema');
const mongoose = require('mongoose');

const createDistrito = async (req, res) => {
  const newdistrito = new Distrito(req.body);
  try {
    await newdistrito.save();
    res.status(201).json({ message: 'Distrito created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};


const getDistritoById = async (req, res) => {
    const DistritoId = req.params.id;
    try {
      const Distritos = await Distrito.findById(DistritoId);
      if (!Distritos) {
        return res.status(404).json({ message: 'Distrito not found' });
      }
      res.status(200).json(Distritos);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };
  
  const getAllDistritos = async (req, res) => {
    try {
      const Distritos = await Distrito.find();
      res.status(200).json(Distritos);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

module.exports = {
    createDistrito,
    getDistritoById,
    getAllDistritos
  };