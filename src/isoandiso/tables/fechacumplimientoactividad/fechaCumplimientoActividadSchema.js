
const mongoose = require('mongoose');

const fechaCumplimientoActividadSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'actividad',
  },
}
);

module.exports = mongoose.model('fechaCumplimientoActividad', fechaCumplimientoActividadSchema);;
