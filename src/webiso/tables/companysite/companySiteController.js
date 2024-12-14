const companySiteService = require('./companySiteService');

// Crear site
const createSite = async (req, res) => {
  try {
    const site = await companySiteService.createSite(req);
    res.status(201).json(site);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la site', error: error.message });
  }
};

// Obtener todas las sites
const getAllSites = async (req, res) => {
  try {
    const sites = await companySiteService.getAllSites();
    res.status(200).json(sites);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las sites', error: error.message });
  }
};

//Eliminar site por ID
const deleteSite = async (req, res) => {
  try {
    await companySiteService.deleteSite(req);
    res.status(200).json({ message: 'site eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la site', error: error.message });
  }
};

module.exports = {
  createSite,
  getAllSites,
  deleteSite,
};