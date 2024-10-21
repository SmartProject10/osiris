const mongoose = require('mongoose');

const datoEmpresaSchema = new mongoose.Schema({
  ruc: {type: String, required: true, unique: true},
  razonSocial: {type: String, required: true},
  pais: {
    type: String,
    enum: ['España', 'México', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panamá', 'Colombia', 'Ecuador', 'Perú', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Venezuela', 'Puerto Rico', 'República Dominicana', 'Cuba', 'Guinea Ecuatorial'],
    required: true
  },
  ciudad: {type: String, required:true},
  direccion: {type: String, required:true},
  actividadEconomica: {type: String, required:true},
  sectorEconomico: {type: String, required:true},
  tamañoEmpresa: {type: String, required:true},
  adquisiciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adquisicionEmpresa',
    required: true
  }],
  sedes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sedeEmpresa',
  }],
  areas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'areaEmpresa',
  }],
});

module.exports = mongoose.model('datoEmpresa', datoEmpresaSchema);