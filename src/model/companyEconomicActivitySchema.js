const mongoose = require('mongoose');

const companyEconomicActivitySchema = new mongoose.Schema({
  iId_Estado: { type: Number, required: true },
  dFechaRegistro: { type: Date, default: Date.now },
});


const CompanyEconomicActivity = mongoose.model('companyEconomicActivity', companyEconomicActivitySchema);

module.exports = CompanyEconomicActivity;
