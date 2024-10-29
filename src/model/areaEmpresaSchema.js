const mongoose = require('mongoose');

const areaEmpresaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  cargos:[{
    type: String,
    required: true
  }],
  isoId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
  },
  trabajadorIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trabajadorEmpresa',
  }],
  nombreSistemaDeGestion:{
    type: String,
  },
  nomenclatura:{
    type: String,
  }
});

module.exports = mongoose.model('areaEmpresa', areaEmpresaSchema);
