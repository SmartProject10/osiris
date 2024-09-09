const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
  iId_Estado: { type: Number, required: true },
  vRazonsocial: { type: String, required: false },
  iId_TipDocumento: { type: String, required: false },
  vNumDocumento: { type: String, required: true, unique: true },
  vNombre: { type: String, required: true },
  vContacto: { type: String },
  vDireccion: { type: String },
  dFechaRegistro: { type: Date, default: Date.now },
  vEmail: { type: String, required: true, unique: true },
  iso: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyIso',
    required: false
  }],
  companyArea: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
    required: false
  }],
  pais: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pais',
    required: true
  }],
  sede:  [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sede',
    required: false
  }],
  companyEconomicActivity:  [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyEconomicActivity',
    required: false
  }]

});


module.exports = mongoose.model('company', companySchema);