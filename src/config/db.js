const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const MONGO_URI = "mongodb://localhost:27017/db/dbIso"; 
const MongoClient = require('mongodb').MongoClient;


async function connectToMongo() {
  try {
    const client = await MongoClient.connect(MONGO_URI, { });
    
    console.log("Connected to MongoDB successfully!");

    const db = client.db("dbIso"); 
    console.log(db);
    await client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo();


module.exports = pool;
