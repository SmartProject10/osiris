const subempresaService = require('./subempresaService');

const createSubcompany = async (req, res) => {
  try {
    const subempresa = await subempresaService.createSubcompany(req);
    res.status(201).json(subempresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la subempresa', error: error.message });
  }
};

const getAllSubcompanies = async (req, res) => {
  try {
    const subempresas = await subempresaService.getAllSubcompanies();
    res.status(200).json(subempresas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando todas las subempresas', error: error.message });
  }
};

const getSubcompanyById = async (req, res) => {
  try {
    const subempresa = await subempresaService.getSubcompanyById(req);
    if (!subempresa) {
      return res.status(404).json({ message: 'Subempresa no encontrada' });
    }
    res.status(200).json(subempresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error agarrando la subempresa con dicho id', error: error.message });
  }
};

const deleteSubcompanyById = async (req, res) => {
  try {
    await subempresaService.deleteSubcompanyById(req);
    res.status(200).json({ message: 'Subempresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la subempresa con dicho id', error: error.message });
  }
};

module.exports = {
  createSubcompany,
  getAllSubcompanies,
  getSubcompanyById,
  deleteSubcompanyById
};