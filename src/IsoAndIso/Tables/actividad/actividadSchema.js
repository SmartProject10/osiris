
const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  actividad: {
    type: String,
    required: true,
  },
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empresa',
  },
  isoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
  },
  objetivoEspecificoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objetivoEspecifico',
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('actividad', actividadSchema);;
