const adquisicionEmpresaService = require('./adquisicionEmpresaService');

//Crear adquisición
const createAcquisition = async (req, res) => {
  try {
    const adquisicion = await adquisicionEmpresaService.createAcquisition(req);
    res.status(201).json(adquisicion);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando la adquisición', error: error.message });
  }
};

//Obtener todas las adquisiciones
const getAllAcquisitions = async (req, res) => {
  try {
    const adquisiciones = await adquisicionEmpresaService.getAllAcquisitions();
    res.status(200).json(adquisiciones);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las adquisiciones', error: error.message });
  }
};

//Obtener adquisición por ID
const getAcquisitionById = async (req, res) => {
  try {
    const adquisicion = await adquisicionEmpresaService.getAcquisitionById(req);
    if (!adquisicion) {
      return res.status(404).json({ message: 'Adquisición no encontrada' });
    }
    res.status(200).json(adquisicion);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo la adquisición por ID', error: error.message });
  }
};

//Eliminar adquisición por ID
const deleteAcquisitionById = async (req, res) => {
  try {
    await adquisicionEmpresaService.deleteAcquisitionById(req);
    res.status(200).json({ message: 'Adquisición eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la adquisición por ID', error: error.message });
  }
};

module.exports = {
  createAcquisition,
  getAllAcquisitions,
  getAcquisitionById,
  deleteAcquisitionById,
};