const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const MONGO_URI = "mongodb://localhost:27017/db/dbIso?retryWrites=true&w=majority"; 
const MongoClient = require('mongodb').MongoClient;


async function connectToMongo() {
  try {
    const client = await MongoClient.connect(MONGO_URI,  {
      serverSelectionTimeoutMS: 20000
    });
    console.log("Connected to MongoDB successfully!");

    const db = client.db("dbIso"); 
    // console.log(db);
    await client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
async function closeMongoConnection(client) {
  if (client) {
    try {
      await client.close();
      console.log('MongoDB connection closed successfully');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
}

connectToMongo();
closeMongoConnection();

module.exports = pool;

// username: isossmartosh
// V0cQdj4Nq7Vab2bm


// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();


// const uri = `mongodb+srv://isossmartosh:V0cQdj4Nq7Vab2bm@cluster0.a8t9cbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
