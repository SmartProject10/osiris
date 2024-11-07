const areaEmpresaService = require('./areaEmpresaService');

//Crear área
const createArea = async (req, res) => {
  try {
    const area = await areaEmpresaService.createArea(req);
    res.status(201).json(area);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el área', error: error.message });
  }
};

//Obtener todas las áreas
const getAllAreas = async (req, res) => {
  try {
    const areas = await areaEmpresaService.getAllAreas();
    res.status(200).json(areas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las áreas', error: error.message });
  }
};

//Obtener área por ID
const getAreaById = async (req, res) => {
  try {
    const area = await areaEmpresaService.getAreaById(req);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el área por ID', error: error.message });
  }
};

//Obtener el cargo de mayor jerarquía del área
const getChargeOfHigherHierarchyOfAreaById = async (req, res) => {
  try {
    const cargodemayorjerarquia = await areaEmpresaService.getChargeOfHigherHierarchyOfAreaById(req);
    res.status(200).json(cargodemayorjerarquia);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el cargo de mayor jerarquía', error: error.message });
  }
};


//Eliminar área por ID
const deleteAreaById = async (req, res) => {
  try {
    await areaEmpresaService.deleteAreaById(req);
    res.status(200).json({ message: 'Área eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el área por ID', error: error.message });
  }
};

module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  getChargeOfHigherHierarchyOfAreaById,
  deleteAreaById,
};