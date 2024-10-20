const trabajadorEmpresaService = require('../services/trabajadorEmpresaService');

const createTrabajadorEmpresa = async (req, res) => {
  try {
    const newTrabajadorEmpresa = await trabajadorEmpresaService.createTrabajadorEmpresa(req.body);
    res.status(201).json(newTrabajadorEmpresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrabajadorEmpresaById = async (req, res) => {
  try {
    const trabajadorEmpresa = await trabajadorEmpresaService.getTrabajadorEmpresaById(req.params.id);
    if (!trabajadorEmpresa) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(trabajadorEmpresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrabajadorEmpresa = async (req, res) => {
  try {
    const updatedTrabajadorEmpresa = await trabajadorEmpresaService.updateTrabajadorEmpresa(req.params.id, req.body);
    if (!updatedTrabajadorEmpresa) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json(updatedTrabajadorEmpresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTrabajadorEmpresa = async (req, res) => {
  try {
    const trabajadorEmpresa = await trabajadorEmpresaService.deleteTrabajadorEmpresa(req.params.id);
    if (!trabajadorEmpresa) return res.status(404).json({ message: 'Trabajador no encontrado' });
    res.status(200).json({ message: 'Trabajador eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrabajadorEmpresa,
  getTrabajadorEmpresaById,
  updateTrabajadorEmpresa,
  deleteTrabajadorEmpresa
};
