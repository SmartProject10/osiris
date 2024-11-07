const paisSchema = require('./paisSchema');

const createCountry = async (req) => {
  const pais = new paisSchema(req.body);
  await pais.save();
  return pais;
};

const getAllCountries = async () => {
    const paises = await paisSchema.find();
    return paises;
};

const getAllIsosOfCountry = async (req) => {
  const paisId = req.params.id;
  const isos = await paisSchema.findById(paisId).populate('isoIds');
  return isos;
};

module.exports = {
  createCountry,
  getAllCountries,
  getAllIsosOfCountry
};