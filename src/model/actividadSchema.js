
const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  actividad: {
    type: String,
    required: true,
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registroEmpresa',
  },
  iso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IsoEmpresa',
  },
  objetivoEspecifico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objetivoEspecifico',
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Actividad', actividadSchema);;
