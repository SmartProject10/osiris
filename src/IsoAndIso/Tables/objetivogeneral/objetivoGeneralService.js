const objetivoGeneralSchema = require('./objetivoGeneralSchema');

const createGeneralObjective = async (req) => {
  const objetivoGeneral = new objetivoGeneralSchema(req.body);
  await objetivoGeneral.save();
  return objetivoGeneral;
};

const getAllGeneralObjectives = async () => {
    const objetivosGenerales = await objetivoGeneralSchema.find();
    return objetivosGenerales;
};

const getGeneralObjectiveById = async (req) => {
  const objetivoGeneralId = req.params.id;
  const objetivoGeneral = await objetivoGeneralSchema.findById(objetivoGeneralId);
  return objetivoGeneral;
};

const deleteGeneralObjectiveById = async (req) => {
  const objetivoGeneralId = req.params.id;
  await objetivoGeneralSchema.findByIdAndDelete(objetivoGeneralId);
};

module.exports = {
  createGeneralObjective,
  getAllGeneralObjectives,
  getGeneralObjectiveById,
  deleteGeneralObjectiveById
};
