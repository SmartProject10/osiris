const sedeEmpresaService = require('./sedeEmpresaService');

// Crear Sede
const createSite = async (req, res) => {
  try {
    const sede = await sedeEmpresaService.createSite(req);
    res.status(201).json(sede);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la sede', error: error.message });
  }
};

// Obtener todas las Sedes
const getAllSites = async (req, res) => {
  try {
    const sedes = await sedeEmpresaService.getAllSites();
    res.status(200).json(sedes);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las sedes', error: error.message });
  }
};

module.exports = {
  createSite,
  getAllSites,
};