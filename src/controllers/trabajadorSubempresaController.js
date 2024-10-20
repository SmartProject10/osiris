const trabajadorSubempresaService = require('../services/trabajadorSubempresaService');

const createTrabajadorSubempresa = async (req, res) => {
  try {
    const newTrabajadorSubempresa = await trabajadorSubempresaService.createTrabajadorSubempresa(req.body);
    res.status(201).json(newTrabajadorSubempresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrabajadorSubempresaById = async (req, res) => {
  try {
    const trabajadorSubempresa = await trabajadorSubempresaService.getTrabajadorSubempresaById(req.params.id);
    if (!trabajadorSubempresa) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(trabajadorSubempresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrabajadorSubempresa = async (req, res) => {
  try {
    const updatedTrabajadorSubempresa = await trabajadorSubempresaService.updateTrabajadorSubempresa(req.params.id, req.body);
    if (!updatedTrabajadorSubempresa) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(updatedTrabajadorSubempresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTrabajadorSubempresa = async (req, res) => {
  try {
    const trabajadorSubempresa = await trabajadorSubempresaService.deleteTrabajadorSubempresa(req.params.id);
    if (!trabajadorSubempresa) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json({ message: 'Trabajador eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrabajadorSubempresa,
  getTrabajadorSubempresaById,
  updateTrabajadorSubempresa,
  deleteTrabajadorSubempresa
};
