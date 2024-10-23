
const mongoose = require('mongoose');

const objetivoEspecificoSchema = new mongoose.Schema({
  objetivo: {
    type: String,
    required: true,
  },
  herramientaGestion: {
    type: String,
    required: true,
  },
  objetivoGeneral: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objetivoGeneral',
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('objetivoEspecifico', objetivoEspecificoSchema);;
