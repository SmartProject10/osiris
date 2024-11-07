const adquisicionEmpresaSchema = require('./adquisicionEmpresaSchema');

const createAcquisition = async (req) => {
  const adquisicion = new adquisicionEmpresaSchema(req.body);
  await adquisicion.save();
  return adquisicion;
};

const getAllAcquisitions = async () => {
    const adquisiciones = await adquisicionEmpresaSchema.find();
    return adquisiciones;
};

const getAcquisitionById = async (req) => {
  const adquisicionId = req.params.id;
  const adquisicion = await adquisicionEmpresaSchema.findById(adquisicionId);
  return adquisicion;
};

const deleteAcquisitionById = async (req) => {
  const adquisicionId = req.params.id;
  await adquisicionEmpresaSchema.findByIdAndDelete(adquisicionId);
};

module.exports = {
  createAcquisition,
  getAllAcquisitions,
  getAcquisitionById,
  deleteAcquisitionById
};
