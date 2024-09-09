const Pais = require('../model/paisSchema');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const createPais = async (req, res) => {
  const newPais = new Pais(req.body);
    try {
      const result = await newPais.save();
      console.log(`New user inserted with ID: ${result._id}`);
      res.status(201).json({ message: 'Pais created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

};

const getPaisById = async (req, res) => {
  const client = await MongoClient.connect(process.env.URI);
  try {
    const paisId = req.params.id;
    const db = client.db('isoDb');
    const collection = db.collection('pais');
    const filter = { _id: new ObjectId(paisId) }; 
    const pais = await collection.findOne(filter);

    if (!pais) {
      return res.status(404).json({ message: 'Pais not found' });
    }

    res.status(200).json(pais);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close();
  }
};

const getAllPais = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
        try {
          await client.connect();
          const filter = {};
          const coll = client.db('isoDb').collection('pais');
          const cursor = coll.find(filter);
          const data = await cursor.toArray();
          // console.log(result);
          return res.json(data);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }finally{
          await client.close();
        }
};

const updatePais = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
try {
await client.connect();
const db = client.db('isoDb'); 
const collection = db.collection('pais');
const paisId = req.params.id; 
const updatedPais = req.body;
const filter = { _id: new ObjectId(paisId) }; 
console.log(paisId);
await collection.findOneAndUpdate(
  filter,
  { $set: updatedPais },
  { returnDocument: 'after' } 
);
res.status(200).json({ message: 'Pais updated successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
} finally {
await client?.close(); 
}
};

const deletePais = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
  try {
    await client.connect();
    const db = client.db('isoDb'); 
    const collection = db.collection('user');
    const paisId = req.params.id; 
    const filter = { _id: new ObjectId(paisId) }; 
    await collection.findOneAndDelete(filter);
    res.status(200).json({ message: 'Pais deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPais,
  getPaisById,
  getAllPais,
  updatePais,
  deletePais,
};
