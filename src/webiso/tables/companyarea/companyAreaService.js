const companyAreaSchema = require('./companyAreaSchema');

const createCompanyArea = async (req) => {
  const companyArea = new companyAreaSchema(req.body);
  await companyArea.save();
  return companyArea;
};

const getAllCompanyAreas = async () => {
    const companyAreas = await companyAreaSchema.find();
    return companyAreas;
};

const getCompanyArea = async (req) => {
  const companyAreaId = req.params.id;
  const companyArea = await companyAreaSchema.findById(companyAreaId);
  return companyArea;
};

const getChargeOfHigherHierarchyOfArea = async (req) => {
  const companyAreaId = req.params.id;
  const companyArea = await companyAreaSchema.findById(companyAreaId);
  const chargeOfHigherHierarchyOfArea = companyArea.cargos[0];
  return chargeOfHigherHierarchyOfArea;
};

const deleteCompanyArea = async (req) => {
  const companyAreaId = req.params.id;
  await companyAreaSchema.findByIdAndDelete(companyAreaId);
};

const deleteIsoOfCompanyArea = async (req) => {
  const companyAreaId = req.params.id;
  const updatedArea = await companyAreaSchema.findByIdAndUpdate(
    companyAreaId,
    { $set: { isoId: null } },
    { new: true }
  );
  if (!updatedArea) {
    const error = new Error("Área de la empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return updatedArea;
};

const updateIso = async (req) => {
  const companyAreaId = req.params.id;
  const { isoId } = req.body;
  const companyArea = await companyAreaSchema.findByIdAndUpdate(
    companyAreaId,
    { $set: { isoId: isoId } },
    { new: true }
  );
  if (!companyArea) {
    const error = new Error("Área de la empresa no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return companyArea;
};

module.exports = {
  createCompanyArea,
  getAllCompanyAreas,
  getCompanyArea,
  getChargeOfHigherHierarchyOfArea,
  deleteCompanyArea,
  deleteIsoOfCompanyArea,
  updateIso
};
