const User = require('../model/userSchema');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save({ bufferTimeoutMS: 20000 });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

const getUserById = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.URI
  );
  try {
    await client.connect();
    const userId =req.params.id;
    const filter = {_id: userId};
     const coll = client.db('isoDb').collection('user');
     const cursor = coll.find(filter);
     const data = await cursor.toArray();
    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }finally{
    await client.close();
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

// const updateUser = async (req, res) => {
//   const client = await MongoClient.connect(
//     process.env.URI
//   );
//   const UserId = req.params.id;
//   const updatedUser = req.body;
//   try {
//     await client.connect();
//     // const filter = {};
//     const coll = client.db('isoDb').collection('user');
//     const cursor = coll.findByIdAndUpdate(UserId, updatedUser, { new: true });
//     const data = await cursor.toArray();
//     if (!data) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const updateUser = async (req, res) => {
  const { id } = req.params.id; 
  const updatedUser = req.body;
  let client; 
  try {
    const uri = process.env.URI;
    if (!uri) {
      return res.status(500).json({ error: 'Missing environment variable: URI' });
    }
    client = await MongoClient.connect(uri);
    const db = client.db('isoDb'); // Use a variable for clarity
    const collection = db.collection('user');
    const filter = { _id: id }; 
    const updateResult = await collection.findOneAndUpdate(
      filter,
      { $set: updatedUser },
      { returnDocument: 'after' } // Return updated document
    );
    if (!updateResult.value) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updateResult.value); // Return the updated user
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close(); // Close the connection even if errors occur
  }
};


const deleteUser = async (req, res) => {
  const UserId = req.params.id;
  try {
    await User.findByIdAndDelete(UserId);
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
