const companyAreaService = require('./companyAreaService');

//Crear área
const createArea = async (req, res) => {
  try {
    const area = await companyAreaService.createArea(req);
    res.status(201).json(area);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el área', error: error.message });
  }
};

//Obtener todas las áreas
const getAllAreas = async (req, res) => {
  try {
    const areas = await companyAreaService.getAllAreas();
    res.status(200).json(areas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las áreas', error: error.message });
  }
};

//Obtener área por ID
const getArea = async (req, res) => {
  try {
    const area = await companyAreaService.getArea(req);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el área', error: error.message });
  }
};

//Obtener el cargo de mayor jerarquía del área
const getChargeOfHigherHierarchyOfArea = async (req, res) => {
  try {
    const chargeOfHigherHierarchyOfArea = await companyAreaService.getChargeOfHigherHierarchyOfArea(req);
    res.status(200).json(chargeOfHigherHierarchyOfArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el cargo de mayor jerarquía', error: error.message });
  }
};


//Eliminar área por ID
const deleteArea = async (req, res) => {
  try {
    await companyAreaService.deleteArea(req);
    res.status(200).json({ message: 'Área eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el área', error: error.message });
  }
};

//Eliminar iso del área
const deleteIsoOfArea = async (req, res) => {
  try {
    await companyAreaService.deleteIsoOfArea(req);
    res.status(200).json({ message: 'Iso del área eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la iso del área', error: error.message });
  }
};

//Actualizar iso del área
const updateIso = async (req, res) => {
  try {
    await companyAreaService.updateIso(req);
    res.status(200).json({ message: 'iso del área actualizada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el iso del área', error: error.message });
  }
};

module.exports = {
  createArea,
  getAllAreas,
  getArea,
  getChargeOfHigherHierarchyOfArea,
  deleteArea,
  deleteIsoOfArea,
  updateIso,
};