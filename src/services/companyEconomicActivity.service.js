const CompanyEconomicActivity = require('../model/companyEconomicActivitySchema');

const createCompanyEconomicActivity = async (req, res) => {
  const newCompanyEconomicActivity = new CompanyEconomicActivity(req.body);
  try {
    await newCompanyEconomicActivity.save();
    res.status(201).json({ message: 'CompanyEconomicActivity created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyEconomicActivityById = async (req, res) => {
  const CompanyEconomicActivityId = req.params.id;
  try {
    const CompanyEconomicActivity = await CompanyEconomicActivity.findById(CompanyEconomicActivityId);
    if (!CompanyEconomicActivity) {
      return res.status(404).json({ message: 'CompanyEconomicActivity not found' });
    }
    res.status(200).json(CompanyEconomicActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCompanyEconomicActivitys = async (req, res) => {
  try {
    const CompanyEconomicActivitys = await CompanyEconomicActivity.find();
    res.status(200).json(CompanyEconomicActivitys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompanyEconomicActivity = async (req, res) => {
  const CompanyEconomicActivityId = req.params.id;
  const updatedCompanyEconomicActivity = req.body;
  try {
    const CompanyEconomicActivity = await CompanyEconomicActivity.findByIdAndUpdate(CompanyEconomicActivityId, updatedCompanyEconomicActivity, { new: true });
    if (!CompanyEconomicActivity) {
      return res.status(404).json({ message: 'CompanyEconomicActivity not found' });
    }
    res.status(200).json(CompanyEconomicActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompanyEconomicActivity = async (req, res) => {
  const CompanyEconomicActivityId = req.params.id;
  try {
    await CompanyEconomicActivity.findByIdAndDelete(CompanyEconomicActivityId);
    res.status(200).json({ message: 'CompanyEconomicActivity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCompanyEconomicActivity,
  getCompanyEconomicActivityById,
  getAllCompanyEconomicActivitys,
  updateCompanyEconomicActivity,
  deleteCompanyEconomicActivity,
};
