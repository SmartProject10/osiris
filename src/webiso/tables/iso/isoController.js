const isoService = require('./isoService');

//Crear ISO
const createIso = async (req, res) => {
  try {
    const iso = await isoService.createIso(req);
    res.status(201).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la ISO', error: error.message });
  }
};

//Obtener todas las ISO
const getAllIsos = async (req, res) => {
  try {
    const isos = await isoService.getAllIsos();
    res.status(200).json(isos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las ISOs', error: error.message });
  }
};

//Obtener ISO por ID
const getIsoById = async (req, res) => {
  try {
    const iso = await isoService.getIsoById(req);
    if (!iso) {
      return res.status(404).json({ message: 'ISO no encontrada' });
    }
    res.status(200).json(iso);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la ISO por ID', error: error.message });
  }
};

//Eliminar ISO por ID
const deleteIsoById = async (req, res) => {
  try {
    await isoService.deleteIsoById(req);
    res.status(200).json({ message: 'ISO eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la ISO por ID', error: error.message });
  }
};

module.exports = {
  createIso,
  getAllIsos,
  getIsoById,
  deleteIsoById,
};