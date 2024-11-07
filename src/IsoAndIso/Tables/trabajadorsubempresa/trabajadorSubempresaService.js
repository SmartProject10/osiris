const trabajadorSubempresaSchema = require('./trabajadorSubempresaSchema');

const createSubcompanyWorker = async (req) => {
  const trabajadorSubempresa = new trabajadorSubempresaSchema(req.body);
  await trabajadorSubempresa.save();
  return trabajadorSubempresa;
};

const getAllSubcompanyWorkers = async () => {
    const trabajadoresSubempresas = await trabajadorSubempresaSchema.find();
    return trabajadoresSubempresas;
};

const getSubcompanyWorkerById = async (req) => {
  const trabajadorSubempresaId = req.params.id;
  const trabajadorSubempresa = await trabajadorSubempresaSchema.findById(trabajadorSubempresaId);
  return trabajadorSubempresa;
};

const deleteSubcompanyWorkerById = async (req) => {
  const trabajadorSubempresaId = req.params.id;
  await trabajadorSubempresaSchema.findByIdAndDelete(trabajadorSubempresaId);
};

module.exports = {
  createSubcompanyWorker,
  getAllSubcompanyWorkers,
  getSubcompanyWorkerById,
  deleteSubcompanyWorkerById
};
