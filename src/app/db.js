const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoose() {
  try {
    await mongoose.connect(process.env.URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error al conectar a MongoDB con Mongoose:', error);
    process.exit(1);
  }
}

module.exports = {
  connectToMongoose,
};