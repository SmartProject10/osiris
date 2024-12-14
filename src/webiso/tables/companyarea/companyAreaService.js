const companyAreaSchema = require('./companyAreaSchema');

const createArea = async (req) => {
  const area = new companyAreaSchema(req.body);
  await area.save();
  return area;
};

const getAllAreas = async () => {
    const areas = await companyAreaSchema.find();
    return areas;
};

const getArea = async (req) => {
  const areaId = req.params.id;
  const area = await companyAreaSchema.findById(areaId);
  return area;
};

const getChargeOfHigherHierarchyOfArea = async (req) => {
  const areaId = req.params.id;
  const area = await companyAreaSchema.findById(areaId);
  const chargeOfHigherHierarchyOfArea = area.cargos[0];
  return chargeOfHigherHierarchyOfArea;
};

const deleteArea = async (req) => {
  const areaId = req.params.id;
  await companyAreaSchema.findByIdAndDelete(areaId);
};

const deleteIsoOfArea = async (req) => {
  const areaId = req.params.id;
  const updatedArea = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $set: { isoId: null } },
    { new: true }
  );
  if (!updatedArea) {
    const error = new Error("Área no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedArea;
};

const updateIso = async (req) => {
  const areaId = req.params.id;
  const { isoId } = req.body;
  const area = await companyAreaSchema.findByIdAndUpdate(
    areaId,
    { $set: { isoId: isoId } },
    { new: true }
  );
  if (!area) {
    const error = new Error("Área no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return area;
};

module.exports = {
  createArea,
  getAllAreas,
  getArea,
  getChargeOfHigherHierarchyOfArea,
  deleteArea,
  deleteIsoOfArea,
  updateIso
};
