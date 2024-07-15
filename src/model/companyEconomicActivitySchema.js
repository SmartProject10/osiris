const mongoose = require('mongoose');

const companyEconomicActivitySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Use ObjectId for unique document identifiers
  iIdEmpresa: { type: Number, required: true }, // Foreign key to Company model
  iId_ActEconomica: { type: Number, required: true }, // Renamed for clarity (underscore preference)
  iId_Estado: { type: Number, required: true },
  dFechaRegistro: { type: Date, default: Date.now },
});

companyEconomicActivitySchema.index({ iIdEmpresa: 1 }, { unique: true }); // Optional index for faster queries by company

const CompanyEconomicActivity = mongoose.model('companyEconomicActivity', companyEconomicActivitySchema);

module.exports = CompanyEconomicActivity;
