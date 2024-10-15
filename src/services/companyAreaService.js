const companyArea = require('../model/companyAreaSchema');

const createCompanyArea = async (req, res) => {
  const newCompanyArea = new companyArea(req.body);
  try {
    await newCompanyArea.save();
    res.status(201).json({ message: 'Company area created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllCompanyArea = async (req, res) => {
    try {
      const companyArea = await companyArea.find();
      res.status(200).json(companyArea);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getCompanyAreaById = async (req, res) => {
  const companyAreaId = req.params.id;
  try {
    const companyArea = await companyArea.findById(companyAreaId);
    if (!companyArea) {
      return res.status(404).json({ message: 'Company area not found' });
    }
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteCompanyArea = async (req, res) => {
  const companyArea = req.params.id;
  try {
    await companyArea.findByIdAndDelete(companyArea);
    res.status(200).json({ message: 'Company area deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createCompanyArea,
    getAllCompanyArea,
    getCompanyAreaById,
    deleteCompanyArea
};
