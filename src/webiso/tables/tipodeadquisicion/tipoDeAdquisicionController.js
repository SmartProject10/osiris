const tipoDeAdquisicionService = require('./tipoDeAdquisicionService');

// Crear Tipo de Adquisición
const createTypeOfAcquisition = async (req, res) => {
  try {
    const tipodeadquisicion = await tipoDeAdquisicionService.createTypeOfAcquisition(req);
    res.status(201).json(tipodeadquisicion);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el tipo de adquisición', error: error.message });
  }
};

// Obtener todos los Tipos de Adquisición
const getAllTypeOfAcquisitions = async (req, res) => {
  try {
    const tipodeadquisiciones = await tipoDeAdquisicionService.getAllTypeOfAcquisitions();
    res.status(200).json(tipodeadquisiciones);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los tipos de adquisiciones', error: error.message });
  }
};

module.exports = {
  createTypeOfAcquisition,
  getAllTypeOfAcquisitions,
};