
const mongoose = require('mongoose');

const fechaCumpActividadSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'actividad',
  },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('fechaCumpActividad', fechaCumpActividadSchema);;
