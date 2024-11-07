const paisService = require('./paisService');

//Crear País
const createCountry = async (req, res) => {
  try {
    const pais = await paisService.createCountry(req);
    res.status(201).json(pais);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el país', error: error.message });
  }
};

//Obtener todos los Países
const getAllCountries = async (req, res) => {
  try {
    const paises = await paisService.getAllCountries();
    res.status(200).json(paises);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los países', error: error.message });
  }
};

//Obtener todas las isos del país ID
const getAllIsosOfCountry = async (req, res) => {
  try {
    const isos = await paisService.getAllIsosOfCountry();
    res.status(200).json(isos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las isos del país', error: error.message });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  getAllIsosOfCountry
};