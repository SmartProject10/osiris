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
    enum: [1, 2], // 1: Activo, 2: Inactivo
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
  companyAreas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyArea'
  }],
  companyAreas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'personArea'
  }],
});

module.exports = mongoose.model('areaEmpresa', areaEmpresaSchema);
