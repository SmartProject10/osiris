const tipoDeAdquisicionSchema = require('./tipoDeAdquisicionSchema');

const createTypeOfAcquisition = async (req) => {
  const tipodeadquisicion = new tipoDeAdquisicionSchema(req.body);
  await tipodeadquisicion.save();
  return tipodeadquisicion;
};

const getAllTypeOfAcquisitions = async () => {
    const tipodeadquisiciones = await tipoDeAdquisicionSchema.find();
    return tipodeadquisiciones;
};

module.exports = {
  createTypeOfAcquisition,
  getAllTypeOfAcquisitions
};