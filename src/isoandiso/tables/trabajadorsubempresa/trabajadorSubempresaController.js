const trabajadorSubempresaService = require('./trabajadorSubempresaService');

//Crear trabajador para subempresa
const createSubcompanyWorker = async (req, res) => {
  try {
    const trabajadorsubempresa = await trabajadorSubempresaService.createSubcompanyWorker(req);
    res.status(201).json(trabajadorsubempresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando al trabajador de la subempresa', error: error.message });
  }
};

//Obtener todos los trabajadores de las subempresas
const getAllSubcompanyWorkers = async (req, res) => {
  try {
    const trabajadoressubempresas = await trabajadorSubempresaService.getAllSubcompanyWorkers();
    res.status(200).json(trabajadoressubempresas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los trabajadores de las subempresas', error: error.message });
  }
};

//Obtener trabajador de subempresa por ID
const getSubcompanyWorkerById = async (req, res) => {
  try {
    const trabajadorsubempresa = await trabajadorSubempresaService.getSubcompanyWorkerById(req);
    if (!trabajadorsubempresa) {
      return res.status(404).json({ message: 'Trabajador de subempresa no encontrado' });
    }
    res.status(200).json(trabajadorsubempresa);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo al trabajador de la subempresa por ID', error: error.message });
  }
};

//Eliminar trabajador de subempresa por ID
const deleteSubcompanyWorkerById = async (req, res) => {
  try {
    await trabajadorSubempresaService.deleteSubcompanyWorkerById(req);
    res.status(200).json({ message: 'Trabajador de subempresa eliminado satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando al trabajador de la subempresa por ID', error: error.message });
  }
};

module.exports = {
  createSubcompanyWorker,
  getAllSubcompanyWorkers,
  getSubcompanyWorkerById,
  deleteSubcompanyWorkerById,
};