const mongoose = require('mongoose');

const companyDataSchema = new mongoose.Schema({
  vTin: {type: String, required: true, unique: true},
  vReasonSocial: {type: String, required: true},
  vCountry: {
    type: String,
    enum: ['España', 'México', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panamá', 'Colombia', 'Ecuador', 'Perú', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Venezuela', 'Puerto Rico', 'República Dominicana', 'Cuba', 'Guinea Ecuatorial'],
    required: true
  },
  vCity: {type: String, required:true},
  vAddress: {type: String, required:true},
  vEconomicActivity: {type: String, required:true},
  vEconomicSector: {type: String, required:true},
  vCompanySize: {type: String, required:true},
  acquisitions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyAcquisition',
    required: true
  }],
  sites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companySite',
  }],
  areas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
  }],
});

module.exports = mongoose.model('companyData', companyDataSchema);