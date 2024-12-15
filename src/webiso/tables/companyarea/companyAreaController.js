const companyAreaService = require('./companyAreaService');

//Crear área
const createCompanyArea = async (req, res) => {
  try {
    const companyArea = await companyAreaService.createCompanyArea(req);
    res.status(201).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el área de la empresa', error: error.message });
  }
};

//Obtener todas las áreas
const getAllCompanyAreas = async (req, res) => {
  try {
    const companyAreas = await companyAreaService.getAllCompanyAreas();
    res.status(200).json(companyAreas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas las áreas de las empresas', error: error.message });
  }
};

//Obtener área por ID
const getCompanyArea = async (req, res) => {
  try {
    const companyArea = await companyAreaService.getCompanyArea(req);
    if (!companyArea) {
      return res.status(404).json({ message: 'Área de la empresa no encontrada' });
    }
    res.status(200).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el área de la empresa', error: error.message });
  }
};

//Obtener el cargo de mayor jerarquía del área
const getChargeOfHigherHierarchyOfArea = async (req, res) => {
  try {
    const chargeOfHigherHierarchyOfArea = await companyAreaService.getChargeOfHigherHierarchyOfArea(req);
    res.status(200).json(chargeOfHigherHierarchyOfArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el cargo de mayor jerarquía del área de la empresa', error: error.message });
  }
};


//Eliminar área por ID
const deleteCompanyArea = async (req, res) => {
  try {
    await companyAreaService.deleteCompanyArea(req);
    res.status(200).json({ message: 'Área de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el área de la empresa', error: error.message });
  }
};

//Eliminar iso del área
const deleteIsoOfCompanyArea = async (req, res) => {
  try {
    await companyAreaService.deleteIsoOfCompanyArea(req);
    res.status(200).json({ message: 'Iso del área de la empresa eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando la iso del área de la empresa', error: error.message });
  }
};

//Actualizar iso del área
const updateIso = async (req, res) => {
  try {
    await companyAreaService.updateIso(req);
    res.status(200).json({ message: 'iso del área de la empresa actualizada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error actualizando el iso del área de la empresa', error: error.message });
  }
};

module.exports = {
  createCompanyArea,
  getAllCompanyAreas,
  getCompanyArea,
  getChargeOfHigherHierarchyOfArea,
  deleteCompanyArea,
  deleteIsoOfCompanyArea,
  updateIso,
};