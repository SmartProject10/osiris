const mongoose = require('mongoose');

const cargoEmpresaSchema = new mongoose.Schema({
  iId_CargoEmp: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true
  },
  iId_Estado: {
    type: Number,
    required: true,
    enum: [1, 2], // 1: Activo, 2: Inactivo
    default: 1
  },
  vCodigo: {
    type: String,
    required: true,
    maxlength: 13
  },
  vNombre: {
    type: String,
    required: true,
    maxlength: 50
  },
  vDescripcion: {
    type: String,
    maxlength: 50
  },
  dFechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CargoEmpresa', cargoEmpresaSchema);
