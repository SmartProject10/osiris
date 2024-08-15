const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDatabase() {
  if (db) return db;
  const client = await MongoClient.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db('isoDb');
  return db;
}

module.exports = connectToDatabase;
