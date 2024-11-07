const objetivoEspecificoService = require('./objetivoEspecificoService');

const createSpecificObjective = async (req, res) => {
  try {
    const objetivoEspecifico = await objetivoEspecificoService.createSpecificObjective(req);
    res.status(201).json(objetivoEspecifico);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el objetivo específico', error: error.message });
  }
};

const getAllSpecificObjectives = async (req, res) => {
  try {
    const objetivosEspecificos = await objetivoEspecificoService.getAllSpecificObjectives();
    res.status(200).json(objetivosEspecificos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los objetivos específicos', error: error.message });
  }
};

const getSpecificObjectiveById = async (req, res) => {
  try {
    const objetivoEspecifico = await objetivoEspecificoService.getSpecificObjectiveById(req);
    if (!objetivoEspecifico) {
      return res.status(404).json({ message: 'Objetivo específico no encontrado' });
    }
    res.status(200).json(objetivoEspecifico);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el objetivo específico con el id dado', error: error.message });
  }
};

const deleteSpecificObjectiveById = async (req, res) => {
  try {
    await objetivoEspecificoService.deleteSpecificObjectiveById(req);
    res.status(200).json({ message: 'Objetivo específico eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el objetivo específico con el id dado', error: error.message });
  }
};

module.exports = {
  createSpecificObjective,
  getAllSpecificObjectives,
  getSpecificObjectiveById,
  deleteSpecificObjectiveById
};