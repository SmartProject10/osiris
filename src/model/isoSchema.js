const mongoose = require('mongoose');

const isoSchema = new mongoose.Schema({
  iId_Estado: { type: Number, required: true },
  vNombre: { type: String, required: true, maxlength: 50 },
  vDescripcion: { type: String },
  dFechaRegistro: { type: Date, default: Date.now },
});



module.exports = mongoose.model('iso', isoSchema);