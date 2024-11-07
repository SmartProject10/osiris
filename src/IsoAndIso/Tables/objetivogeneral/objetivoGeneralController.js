const objetivoGeneralService = require('./objetivoGeneralService');

const createGeneralObjective = async (req, res) => {
  try {
    const objetivoGeneral = await objetivoGeneralService.createGeneralObjective(req);
    res.status(201).json(objetivoGeneral);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el objetivo general', error: error.message });
  }
};

const getAllGeneralObjectives = async (req, res) => {
  try {
    const objetivosGenerales = await objetivoGeneralService.getAllGeneralObjectives();
    res.status(200).json(objetivosGenerales);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los objetivos generales', error: error.message });
  }
};

const getGeneralObjectiveById = async (req, res) => {
  try {
    const objetivoGeneral = await objetivoGeneralService.getGeneralObjectiveById(req);
    if (!objetivoGeneral) {
      return res.status(404).json({ message: 'Objetivo general no encontrado' });
    }
    res.status(200).json(objetivoGeneral);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el objetivo general con dicho id', error: error.message });
  }
};

const deleteGeneralObjectiveById = async (req, res) => {
  try {
    await objetivoGeneralService.deleteGeneralObjectiveById(req);
    res.status(200).json({ message: 'Objetivo general eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el objetivo general con dicho id', error: error.message });
  }
};

module.exports = {
  createGeneralObjective,
  getAllGeneralObjectives,
  getGeneralObjectiveById,
  deleteGeneralObjectiveById
};