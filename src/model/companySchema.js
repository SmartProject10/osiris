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
  isos: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyIso'
  }],
  companyAreas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyArea'
  }],
  pais: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pais'
  }],
  sedes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sede' // Reference the company model name
  }
});

const Company = mongoose.model('company', companySchema);

companySchema.virtual('companyEconomicActivity', {
  ref: 'companyEconomicActivity',
  localField: 'iId_Empresa',
  foreignField: 'iIdEmpresa',
  justOne: false // Allow multiple activities
});

module.exports = [Company, companySchema];