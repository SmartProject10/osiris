const objetivoEspecificoSchema = require('./objetivoEspecificoSchema');

const createSpecificObjective = async (req) => {
  const objetivoEspecífico = new objetivoEspecificoSchema(req.body);
  await objetivoEspecífico.save();
  return objetivoEspecífico;
};

const getAllSpecificObjectives = async () => {
    const objetivosEspecíficos = await objetivoEspecificoSchema.find();
    return objetivosEspecíficos;
};

const getSpecificObjectiveById = async (req) => {
  const objetivoEspecíficoId = req.params.id;
  const objetivoEspecífico = await objetivoEspecificoSchema.findById(objetivoEspecíficoId);
  return objetivoEspecífico;
};

const deleteSpecificObjectiveById = async (req) => {
  const objetivoEspecíficoId = req.params.id;
  await objetivoEspecificoSchema.findByIdAndDelete(objetivoEspecíficoId);
};

module.exports = {
  createSpecificObjective,
  getAllSpecificObjectives,
  getSpecificObjectiveById,
  deleteSpecificObjectiveById
};
