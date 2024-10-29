const mongoose = require('mongoose');

const isoSchema = new mongoose.Schema({
  nombre: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('iso', isoSchema);
