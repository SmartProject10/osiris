const mongoose = require('mongoose');

const companyIsoSchema = new mongoose.Schema({

    iId_Empresa_Iso: {
      type: Number,
      required: true,
      autoIncrement: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
  
    // Reference to the Area document
    iso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'iso',
      required: true
    },
    iId_Estado: {
      type: Number,
      required: true,
    },
    dFechaRegistro: {
      type: Date,
      required: true,
      default: Date.now,
    },
  });

const CompanyIso = mongoose.model('companyIso', companyIsoSchema);

module.exports = CompanyIso;