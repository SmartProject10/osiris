const companyCountrySchema = require('./companyCountrySchema');

const createCountry = async (req) => {
  const country = new companyCountrySchema(req.body);
  await country.save();
  return country;
};

const getAllCountries = async () => {
    const countries = await companyCountrySchema.find();
    return countries;
};

const getAllIsosOfCountry = async (req) => {
  const countryId = req.params.id;
  const country = await companyCountrySchema.findById(countryId).populate('isoIds');
  const isos = country.isoIds
  return isos;
};

const getAllCountriesWithIsos = async (req) => {
  const countries = await companyCountrySchema.find({ isoIds: { $ne: null } }).populate('isoIds');
  return countries;
};

module.exports = {
  createCountry,
  getAllCountries,
  getAllIsosOfCountry,
  getAllCountriesWithIsos
};