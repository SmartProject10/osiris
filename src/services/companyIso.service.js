const Iso = require('../model/isoSchema');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();


const createIso = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
    try {
      await client.connect();
      const newIso = new Iso(req.body);
      const coll = client.db('isoDb').collection('iso');
      const result = await coll.insertOne(newIso);
      console.log(`New iso inserted with ID: ${result.insertedId}`);
      res.status(201).json({ message: 'ISO created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }finally{
      await client.close();
    }
};

const getIsoById = async (req, res) => {
  const client = await MongoClient.connect(process.env.URI);
  try {
    const isoId = req.params.id;
    const db = client.db('isoDb');
    const collection = db.collection('iso');
    const filter = { _id: new ObjectId(isoId) }; 
    const iso = await collection.findOne(filter);

    if (!iso) {
      return res.status(404).json({ message: 'Iso not found' });
    }

    res.status(200).json(iso);

  } catch (error) {
    console.error('Error fetching iso:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close();
  }

};

const getAllIsos = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
        try {
          await client.connect();
          const filter = {};
          const isos = client.db('isoDb').collection('iso');
          const cursor = isos.find(filter);
          const data = await cursor.toArray();
          res.status(200).json(data);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }finally{
          await client?.close();
        }

};

const updateIso = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
try {
await client.connect();
const db = client.db('isoDb'); 
const collection = db.collection('company');
const isoId = req.params._id; 
const updatedIso = req.body;
const filter = { _id: new ObjectId(isoId) }; 
await collection.findOneAndUpdate(
  filter,
  { $set: updatedIso },
  { returnDocument: 'after' } 
);
res.status(200).json({ message: 'Iso updated successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
} finally {
await client?.close(); 
}

};

const deleteIso = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
  try {
    await client.connect();
    const db = client.db('isoDb'); 
    const isos = db.collection('iso');
    const isoId = req.params.id; 
    const filter = { _id: new ObjectId(isoId) }; 
    await isos.findOneAndDelete(filter);
    res.status(200).json({ message: 'Iso deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

module.exports = {
  createIso,
  getIsoById,
  getAllIsos,
  updateIso,
  deleteIso,
};
