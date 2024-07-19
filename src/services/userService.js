const User = require('../model/userSchema');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const createUser = async (req, res) => {
const client = await MongoClient.connect(
  process.env.URI
);
  try {
    await client.connect();
    const newUser = new User(req.body);
    const coll = client.db('isoDb').collection('user');
    const emailUser = req.body.email;
    const findEmail = coll.findEmail({email: emailUser})
    if(findEmail){
      return res.status(404).json({ error: error.message });
    }
    const result = await coll.insertOne(newUser);
    console.log(`New user inserted with ID: ${result.insertedId}`);
    await newUser.save({ bufferTimeoutMS: 20000 });
    res.status(201).json({ message: 'User created successfully' });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }finally{
    await client.close();
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


const updateUser = async (req, res) => {
  const userId = req.params.id; 
  const updatedUser = req.body;
  const client = await MongoClient.connect(
        process.env.URI
      );
  try {
    await client.connect();
    const db = client.db('isoDb'); 
    const collection = db.collection('user');
    const filter = { _id: userId }; 
    const updateResult = await collection.findOneAndUpdate(
      filter,
      { $set: updatedUser },
      { returnDocument: 'after' } 
    );
    if (!updateResult) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updateResult); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close(); 
  }
};


// const deleteUser = async (req, res) => {
//   const userId = req.params.id; 
//   const client = await MongoClient.connect(
//         process.env.URI
//       );
//   try {
//     await client.connect();
//     const db = client.db('isoDb'); 
//     const collection = db.collection('user');
//     const filter = { _id: userId }; 
//     await collection.findByIdAndDelete(filter);
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const deleteUser = async (req, res) => {
  const userId  = req.params.id; 
  let client; 
  try {
    client = await MongoClient.connect(process.env.URI);
    const db = client.db('isoDb');
    const collection = db.collection('user');
    const filter = { _id: userId }; 
    const deleteResult = await collection.findOneAndDelete(filter);
    if (!deleteResult) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client?.close(); 
  }
};



module.exports = {
  createUser,
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
};
