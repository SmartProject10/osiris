const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  iId_Empresa: { type: Number, required: true, unique: true },
  iId_Estado: { type: Number, required: true },
  iId_TipDocumento: { type: Number, required: true },
  vNumDocumento: { type: String, required: true, unique: true },
  vNombre: { type: String, required: true },
  vContacto: { type: String },
  vDireccion: { type: String },
  dFechaRegistro: { type: Date, default: Date.now },
  vEmail: { type: String, required: true, unique: true },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

