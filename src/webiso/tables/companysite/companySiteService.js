const companySiteSchema = require('./companySiteSchema');

const createSite = async (req) => {
  const site = new companySiteSchema(req.body);
  await site.save();
  return site;
};

const getAllSites = async () => {
    const sites = await companySiteSchema.find();
    return sites;
};

const deleteSite = async (req, res) => {
  const siteId = req.params.id;
  await companySiteSchema.findByIdAndDelete(siteId);
};

module.exports = {
  createSite,
  getAllSites,
  deleteSite
};