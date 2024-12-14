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

const getIso = async (req) => {
  const isoId = req.params.id;
  const iso = await isoSchema.findById(isoId);
  return iso;
};

const deleteIso = async (req) => {
  const isoId = req.params.id;
  await isoSchema.findByIdAndDelete(isoId);
};

module.exports = {
  createIso,
  getAllIsos,
  getIso,
  deleteIso
};