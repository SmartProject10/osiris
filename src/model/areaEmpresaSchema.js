const mongoose = require('mongoose');

const areaEmpresaSchema = new mongoose.Schema({
  iId_AreaEmpresa: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true
  },
  iId_Estado: {
    type: Number,
    required: true,
    enum: [1, 2],
    default: 1
  },
  vCodigo: {
    type: String,
    required: true,
    maxlength: 13
  },
  vDescripcion: {
    type: String,
    required: true,
    maxlength: 50
  },
  dFechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AreaEmpresa', areaEmpresaSchema);
