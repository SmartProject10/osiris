const companyAcquisition = require('../model/companyAcquisitionSchema');

const createCompanyAcquisition = async (req, res) => {
  const newCompanyAcquisition = new companyAcquisition(req.body);
  try {
    await newCompanyAcquisition.save();
    res.status(201).json({ message: 'Company acquisition created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllCompanyAcquisition = async (req, res) => {
    try {
      const companyAcquisition = await companyAcquisition.find();
      res.status(200).json(companyAcquisition);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getCompanyAcquisitionById = async (req, res) => {
  const companyAcquisitionId = req.params.id;
  try {
    const companyAcquisition = await companyAcquisition.findById(companyAcquisitionId);
    if (!companyAcquisition) {
      return res.status(404).json({ message: 'Company acquisition not found' });
    }
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteCompanyAcquisition = async (req, res) => {
  const companyAcquisition = req.params.id;
  try {
    await companyAcquisition.findByIdAndDelete(companyAcquisition);
    res.status(200).json({ message: 'Company acquisition deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createCompanyAcquisition,
    getAllCompanyAcquisition,
    getCompanyAcquisitionById,
    deleteCompanyAcquisition
};
