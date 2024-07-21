const mongoose = require('mongoose');

const areaEmpresaSchema = new mongoose.Schema({
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
  companyArea: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
    required:false
  }]
});

module.exports = mongoose.model('areaEmpresa', areaEmpresaSchema);
