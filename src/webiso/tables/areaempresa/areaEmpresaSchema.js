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
  }
});

module.exports = mongoose.model('areaEmpresa', areaEmpresaSchema);
