const mongoose = require('mongoose');

const companyEconomicActivitySchema = new mongoose.Schema({
    iId_EmpActEcon: { type: Number, required: true, unique: true },
    iIdEmpresa: { type: Number, required: true }, // Foreign key to Company model
    iId_ActEconomica: { type: Number, required: true },
    iId_Estado: { type: Number, required: true },
    dFechaRegistro: { type: Date, default: Date.now },
  });

  const CompanyEconomicActivity = mongoose.model('CompanyEconomicActivity', companyEconomicActivitySchema);

  module.exports = CompanyEconomicActivity;

  