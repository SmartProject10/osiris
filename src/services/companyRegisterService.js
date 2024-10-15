const companyRegister = require('../model/companyRegisterSchema');

const createCompany = async (req, res) => {
  const newCompany = new companyRegister(req.body);
  try {
    await newCompany.save();
    res.status(201).json({ message: 'Company created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllCompanies = async (req, res) => {
    try {
      const companies = await companyRegister.find();
      res.status(200).json(companies);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await companyRegister.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    await companyRegister.findByIdAndDelete(companyId);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany
};
