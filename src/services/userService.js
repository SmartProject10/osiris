const User = require('../model/userSchema');
const { MongoClient, ObjectId } = require('mongodb');
const personService = require('../services/personaService');
require('dotenv').config();

const createUser = async (req, res) => {
const client = await MongoClient.connect(
  process.env.URI
);
  try {
    await client.connect();
    const newUser = new User(req.body);
    const coll = client.db('isoDb').collection('user');
    const result = await coll.insertOne(newUser);
    console.log(`New user inserted with ID: ${result.insertedId}`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }finally{
    await client.close();
  }
  
};

const getUserById = async (req, res) => {
  const client = await MongoClient.connect(process.env.URI);
  try {
    const userId = req.params.id;
    const db = client.db('isoDb');
    const collection = db.collection('user');
    const filter = { _id: new ObjectId(userId) }; 
    const user = await collection.findOne(filter);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close();
  }
};

const getAllUser = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
        try {
          await client.connect();
          const filter = {};
          const coll = client.db('isoDb').collection('user');
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

const updateUser = async (req, res) => {

  const client = await MongoClient.connect(
        process.env.URI
      );
  try {
    await client.connect();
    const db = client.db('isoDb'); 
    const collection = db.collection('user');
    const userId = req.params.id; 
    const updatedUser = req.body;
    const filter = { _id: new ObjectId(userId) }; 
    console.log(userId);
    await collection.findOneAndUpdate(
      filter,
      { $set: updatedUser },
      { returnDocument: 'after' } 
    );
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close(); 
  }
};

const deleteUser = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
  try {
    await client.connect();
    const db = client.db('isoDb'); 
    const collection = db.collection('user');
    const userId = req.params.id; 
    const filter = { _id: new ObjectId(userId) }; 
    await collection.findOneAndDelete(filter);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createUser,
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
};
