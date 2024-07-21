const mongoose = require('mongoose');

const personAreaSchema = new mongoose.Schema({
  // Reference to the Company document
  personas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },

  // Reference to the Area document
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'areaEmpresa',
    required: true
  }
});

module.exports = mongoose.model('personArea', personAreaSchema);
