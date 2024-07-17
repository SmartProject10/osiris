const Company = require('../model/companySchema');

const createCompany = async (req, res) => {
  const newCompany = new Company(req.body);
  try {
    await newCompany.save();
    res.status(201).json({ message: 'Company created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyById = async (req, res) => {
  const CompanyId = req.params.id;
  try {
    const Company = await Company.findById(CompanyId);
    if (!Company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(Company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCompanys = async (req, res) => {
  try {
    const companies = await Company.find({}).exec();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
};

const updateCompany = async (req, res) => {
  const CompanyId = req.params.id;
  const updatedCompany = req.body;
  try {
    const Company = await Company.findByIdAndUpdate(CompanyId, updatedCompany, { new: true });
    if (!Company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(Company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const CompanyId = req.params.id;
  try {
    await Company.findByIdAndDelete(CompanyId);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCompany,
  getCompanyById,
  getAllCompanys,
  updateCompany,
  deleteCompany,
};
