const companyAcquisitionSchema = require('./companyAcquisitionSchema');

const createAcquisition = async (req) => {
  const acquisition = new companyAcquisitionSchema(req.body);
  await acquisition.save();
  return acquisition;
};

const getAllAcquisitions = async () => {
    const acquisitions = await companyAcquisitionSchema.find();
    return acquisitions;
};

const getAcquisition = async (req) => {
  const adquisicionId = req.params.id;
  const acquisition = await companyAcquisitionSchema.findById(adquisicionId);
  return acquisition;
};

const deleteAcquisition = async (req) => {
  const adquisicionId = req.params.id;
  await companyAcquisitionSchema.findByIdAndDelete(adquisicionId);
};

module.exports = {
  createAcquisition,
  getAllAcquisitions,
  getAcquisition,
  deleteAcquisition
};
