const isoSchema = require('./isoSchema');

const createIso = async (req) => {
  const iso = new isoSchema(req.body);
  await iso.save();
  return iso;
};

const getAllIsos = async () => {
    const isos = await isoSchema.find();
    return isos;
};

const getIsoById = async (req) => {
  const isoId = req.params.id;
  const iso = await isoSchema.findById(isoId);
  return iso;
};

const deleteisoById = async (req) => {
  const isoId = req.params.id;
  await isoSchema.findByIdAndDelete(isoId);
};

module.exports = {
  createIso,
  getAllIsos,
  getIsoById,
  deleteisoById
};