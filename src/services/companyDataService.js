const companyData = require('../model/companyDataSchema');

const createCompanyData = async (req, res) => {
  const newCompanyData = new companyData(req.body);
  try {
    await newCompanyData.save();
    res.status(201).json({ message: 'Company data created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllCompanyData = async (req, res) => {
    try {
      const companyData = await companyData.find();
      res.status(200).json(companyData);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getCompanyDataById = async (req, res) => {
  const companyDataId = req.params.id;
  try {
    const companyData = await companyData.findById(companyDataId);
    if (!companyData) {
      return res.status(404).json({ message: 'Company data not found' });
    }
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteCompanyData = async (req, res) => {
  const companyData = req.params.id;
  try {
    await companyData.findByIdAndDelete(companyData);
    res.status(200).json({ message: 'Company data deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createCompanyData,
    getAllCompanyData,
    getCompanyDataById,
    deleteCompanyData
};
