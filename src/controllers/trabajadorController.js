const trabajadorService = require('../services/trabajadorService');

const createTrabajador = async (req, res) => {
  try {
    const newTrabajador = await trabajadorService.createTrabajador(req.body);
    res.status(201).json(newTrabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrabajadorById = async (req, res) => {
  try {
    const trabajador = await trabajadorService.getTrabajadorById(req.params.id);
    if (!trabajador) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(trabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTrabajadores = async (req, res) => {
  try {
    const trabajadores = await trabajadorService.getAllTrabajadores();
    res.status(200).json(trabajadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrabajador = async (req, res) => {
  try {
    const updatedTrabajador = await trabajadorService.updateTrabajador(req.params.id, req.body);
    if (!updatedTrabajador) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(updatedTrabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTrabajador = async (req, res) => {
  try {
    const trabajador = await trabajadorService.deleteTrabajador(req.params.id);
    if (!trabajador) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json({ message: 'Trabajador eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrabajador,
  getTrabajadorById,
  getAllTrabajadores,
  updateTrabajador,
  deleteTrabajador
};
