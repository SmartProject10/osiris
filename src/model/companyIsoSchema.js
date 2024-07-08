const mongoose = require('mongoose');

const companyIsoSchema = new mongoose.Schema({

    iId_Empresa_Iso: {
      type: Number,
      required: true,
      autoIncrement: true,
    },
    iId_Empresa: {
      type: Number,
      required: true,
    },
    iId_iso: {
      type: Number,
      required: true,
      enum: [1, 2], // 1: Activo, 2: Inactivo
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

const CompanyIso = mongoose.model('CompanyIso', companyIsoSchema);

module.exports = CompanyIso;