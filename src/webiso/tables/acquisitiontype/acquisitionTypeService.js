const acquisitionTypeSchema = require('./acquisitionTypeSchema');

const createTypeOfAcquisition = async (req) => {
  const acquisitionType = new acquisitionTypeSchema(req.body);
  await acquisitionType.save();
  return acquisitionType;
};

const getAllTypeOfAcquisitions = async () => {
    const acquisitionTypes = await acquisitionTypeSchema.find();
    return acquisitionTypes;
};

module.exports = {
  createTypeOfAcquisition,
  getAllTypeOfAcquisitions
};