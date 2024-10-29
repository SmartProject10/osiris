const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
  nombre: {type: String, required: true, unique: true},
  isoIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso'
  }]
});

module.exports = mongoose.model('pais', paisSchema);