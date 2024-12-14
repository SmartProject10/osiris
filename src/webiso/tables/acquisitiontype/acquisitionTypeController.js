const acquisitionTypeService = require('./acquisitionTypeService');

// Crear Tipo de Adquisición
const createTypeOfAcquisition = async (req, res) => {
  try {
    const acquisitionType = await acquisitionTypeService.createTypeOfAcquisition(req);
    res.status(201).json(acquisitionType);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el tipo de adquisición', error: error.message });
  }
};

// Obtener todos los Tipos de Adquisición
const getAllTypeOfAcquisitions = async (req, res) => {
  try {
    const acquisitionTypes = await acquisitionTypeService.getAllTypeOfAcquisitions();
    res.status(200).json(acquisitionTypes);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los tipos de adquisiciones', error: error.message });
  }
};

module.exports = {
  createTypeOfAcquisition,
  getAllTypeOfAcquisitions,
};