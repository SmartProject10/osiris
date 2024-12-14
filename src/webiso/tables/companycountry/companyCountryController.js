const companyCountryService = require('./companyCountryService');

//Crear País
const createCountry = async (req, res) => {
  try {
    const country = await companyCountryService.createCountry(req);
    res.status(201).json(country);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el país', error: error.message });
  }
};

//Obtener todos los Países
const getAllCountries = async (req, res) => {
  try {
    const countries = await companyCountryService.getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los países', error: error.message });
  }
};

//Obtener todas las isos del país ID
const getAllIsosOfCountry = async (req, res) => {
  try {
    const isos = await companyCountryService.getAllIsosOfCountry();
    res.status(200).json(isos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las isos del país', error: error.message });
  }
};

//Obtener los countries con al menos una iso habilitadas
const getAllCountriesWithIsos = async (req, res) => {
  try {
    const countries = await companyCountryService.getAllCountriesWithIsos();
    res.status(200).json(countries);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los countries con al menos una iso', error: error.message });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  getAllIsosOfCountry,
  getAllCountriesWithIsos
};