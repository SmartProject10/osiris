const areaEmpresaSchema = require('./areaEmpresaSchema');

const createArea = async (req) => {
  const area = new areaEmpresaSchema(req.body);
  await area.save();
  return area;
};

const getAllAreas = async () => {
    const areas = await areaEmpresaSchema.find();
    return areas;
};

const getAreaById = async (req) => {
  const areaId = req.params.id;
  const area = await areaEmpresaSchema.findById(areaId);
  return area;
};

const getChargeOfHigherHierarchyOfAreaById = async (req) => {
  const areaId = req.params.id;
  const area = await areaEmpresaSchema.findById(areaId);
  const cargodemayorjerarquia = area.cargos[0];
  return cargodemayorjerarquia;
};

const deleteAreaById = async (req) => {
  const areaId = req.params.id;
  await areaEmpresaSchema.findByIdAndDelete(areaId);
};

module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  getChargeOfHigherHierarchyOfAreaById,
  deleteAreaById
};
