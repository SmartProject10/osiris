const nacionalidadService = require('./nacionalidadService');

//Crear Nacionalidad
const createNationality = async (req, res) => {
  try {
    const nacionalidad = await nacionalidadService.createNationality(req);
    res.status(201).json(nacionalidad);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la nacionalidad', error: error.message });
  }
};

//Obtener todas las Nacionalidades
const getAllNationalities = async (req, res) => {
  try {
    const nacionalidades = await nacionalidadService.getAllNationalities();
    res.status(200).json(nacionalidades);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las nacionalidades', error: error.message });
  }
};

module.exports = {
  createNationality,
  getAllNationalities,
};