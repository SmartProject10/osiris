const Company = require('../model/companySchema');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const createCompany = async (req, res) => {
  const newCompany = new Company(req.body);
    try {
      const result = await newCompany.save();
      console.log(`New company inserted with ID: ${result._id}`);
      res.status(201).json({ message: 'Company created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
};
const getCompanyById = async (req, res) => {
  const client = await MongoClient.connect(process.env.URI);
  try {
    const companyId = req.params.id;
    const db = client.db('test');
    const collection = db.collection('company');
    const filter = { _id: new ObjectId(companyId) }; 
    const company = await collection.findOne(filter);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);

  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close();
  }
};
const getAllCompanys = async (req, res) => {
    try {
      const data = await Company.find();
      res.status(200).json(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Error al realizar la búsqueda"
        });
    }
};
const updateCompany = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
try {
await client.connect();
const db = client.db('test'); 
const collection = db.collection('company');
const companyId = req.params._id; 
const updatedCompany = req.body;
const filter = { _id: new ObjectId(companyId) }; 
console.log(companyId);
await collection.findOneAndUpdate(
  filter,
  { $set: updatedCompany },
  { returnDocument: 'after' } 
);
res.status(200).json({ message: 'Company updated successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
} finally {
await client?.close(); 
}

};
const deleteCompany = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
  try {
    await client.connect();
    const db = client.db('test'); 
    const companies = db.collection('company');
    const companyId = req.params.id; 
    const filter = { _id: new ObjectId(companyId) }; 
    await companies.findOneAndDelete(filter);
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
