const nacionalidadSchema = require('./nacionalidadSchema.js');

//COMMONS

const createNationality = async (req) => {
  const nacionalidad = new nacionalidadSchema(req.body);
  await nacionalidad.save();
  return nacionalidad;
};

const getAllNationalities = async () => {
    const nacionalidades = await nacionalidadSchema.find();
    return nacionalidades;
};

module.exports = {
  createNationality,
  getAllNationalities
};