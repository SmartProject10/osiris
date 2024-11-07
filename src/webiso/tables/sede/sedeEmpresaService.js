const sedeEmpresaSchema = require('./sedeEmpresaSchema');

const createSite = async (req) => {
  const sede = new sedeEmpresaSchema(req.body);
  await sede.save();
  return sede;
};

const getAllSites = async () => {
    const sedes = await sedeEmpresaSchema.find();
    return sedes;
};

module.exports = {
  createSite,
  getAllSites
};