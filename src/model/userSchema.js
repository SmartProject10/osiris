
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);;
