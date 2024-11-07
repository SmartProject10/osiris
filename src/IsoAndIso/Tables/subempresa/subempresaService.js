const subempresaSchema = require('./subempresaSchema');

const createSubcompany = async (req) => {
  const subempresa = new subempresaSchema(req.body);
  await subempresa.save();
  return subempresa;
};

const getAllSubcompanies = async () => {
    const subempresas = await subempresaSchema.find();
    return subempresas;
};

const getSubcompanyById = async (req) => {
  const subempresaId = req.params.id;
  const subempresa = await subempresaSchema.findById(subempresaId);
  return subempresa;
};

const deleteSubcompanyById = async (req) => {
  const subempresaId = req.params.id;
  await subempresaSchema.findByIdAndDelete(subempresaId);
};

module.exports = {
  createSubcompany,
  getAllSubcompanies,
  getSubcompanyById,
  deleteSubcompanyById
};
