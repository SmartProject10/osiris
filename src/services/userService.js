const User = require('../model/userSchema');
const { MongoClient, ObjectId } = require('mongodb');
const connectToDatabase = require('../utils/connectToDatabase');
require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const coll = db.collection('user');
    const newUser = new User(req.body);
    const result = await coll.insertOne(newUser);
    console.log(`New user inserted with ID: ${result.insertedId}`);
    res.status(201).json({ message: 'User created successfully', id: result.insertedId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const userId = req.params.id;
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
  } 
};

const getEmail = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const correo = req.body.email;
    const filter = { email: correo };
    const coll = db.collection('user');
    const user = coll.find(filter);
    const data = await user.toArray();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const coll = db.collection('user');
    const cursor = coll.find({});
    const data = await cursor.toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error al realizar la búsqueda"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const userId = req.params.id;
    const updatedUser = req.body;
    const filter = { _id: new ObjectId(userId) };
    await db.collection('user').findOneAndUpdate(
      filter,
      { $set: updatedUser },
      { returnDocument: 'after' }
    );
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const userId = req.params.id;
    const filter = { _id: new ObjectId(userId) };
    await db.collection('user').findOneAndDelete(filter);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getEmail,
  getAllUser,
  updateUser,
  deleteUser,
};
