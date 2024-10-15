const companySite = require('../model/companySiteSchema');

const createCompanySite = async (req, res) => {
  const newCompanySite = new companySite(req.body);
  try {
    await newCompanySite.save();
    res.status(201).json({ message: 'Company site created successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllCompanySite = async (req, res) => {
    try {
      const companySite = await companySite.find();
      res.status(200).json(companySite);
    } catch (error) { 
      // res.status(error.statusCode || 500).json({ error: error.message });
      console.log(error);
    }
  };

const getCompanySiteById = async (req, res) => {
  const companySiteId = req.params.id;
  try {
    const companySite = await companySite.findById(companySiteId);
    if (!companySite) {
      return res.status(404).json({ message: 'Company site not found' });
    }
    res.status(201).json(company);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const deleteCompanySite = async (req, res) => {
  const companySite = req.params.id;
  try {
    await companySite.findByIdAndDelete(companySite);
    res.status(200).json({ message: 'Company site deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
    createCompanySite,
    getAllCompanySite,
    getCompanySiteById,
    deleteCompanySite
};
