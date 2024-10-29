
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
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empresa',
  },
},
{
  timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);;
