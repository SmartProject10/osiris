const companyAcquisitionService = require('./companyAcquisitionService');

//Crear adquisición
const createAcquisition = async (req, res) => {
  try {
    const acquisition = await companyAcquisitionService.createAcquisition(req);
    res.status(201).json(acquisition);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la adquisición', error: error.message });
  }
};

//Obtener todas las acquisitions
const getAllAcquisitions = async (req, res) => {
  try {
    const acquisitions = await companyAcquisitionService.getAllAcquisitions();
    res.status(200).json(acquisitions);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las acquisitions', error: error.message });
  }
};

//Obtener adquisición por ID
const getAcquisition = async (req, res) => {
  try {
    const acquisition = await companyAcquisitionService.getAcquisition(req);
    if (!acquisition) {
      return res.status(404).json({ message: 'Adquisición no encontrada' });
    }
    res.status(200).json(acquisition);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la adquisición', error: error.message });
  }
};

//Eliminar adquisición por ID
const deleteAcquisition = async (req, res) => {
  try {
    await companyAcquisitionService.deleteAcquisition(req);
    res.status(200).json({ message: 'Adquisición eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la adquisición', error: error.message });
  }
};

module.exports = {
  createAcquisition,
  getAllAcquisitions,
  getAcquisition,
  deleteAcquisition,
};