const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  iId_Persona: {
    type: Number,
    required: true,
    unique: true, // Primary key based on table definition
  },
  iId_TipDocumento: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5], 
  },
  iId_GeneroPersona: {
    type: Number,
    required: true,
  },
  iId_NivelEstudio: {
    type: Number,
    required: true,
  },
  iId_Ubigeo: {
    type: Number,
    required: true,
  },
  iId_Estado: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4], // Assuming IDs map to valid states
  },
  iId_EstadoCivil: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5], // Assuming IDs map to civil states
  },
  iId_TipSegMedico: {
    type: Number,
  },
  iId_SistPension: {
    type: Number,
  },
  vActaNacimiento: {
    type: String,
  },
  vComprobanteDomicilio: {
    type: String,
  },
  vCodigoSegMedico: {
    type: String,
    maxlength: 50,
  },
  vNombre: {
    type: String,
    required: true,
    maxlength: 50,
  },
  vApePaterno: {
    type: String,
    required: true,
    maxlength: 50,
  },
  vApeMaterno: {
    type: String,
    maxlength: 50,
  },
  vNumDocumento: {
    type: String,
    required: true,
    maxlength: 20,
  },
  vNacionalidad: {
    type: String,
    required: true,
  },
  vNumSeguroSocial: {
    type: String,
    maxlength: 20,
  },
  vCelular: {
    type: String,
    maxlength: 15,
  },
  vDireccion: {
    type: String,
    required: true,
  },
  dFechaNacimiento: {
    type: Date,
    required: true,
  },
  dFechaIngreso: {
    type: Date,
    required: true,
  },
  vbFacial: {
    type: Buffer,
  },
  vbFirmaDigital: {
    type: Buffer,
  },
  dFechaRegistro: {
    type: Date,
  },
  companyAreas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'personArea'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  
});

module.exports = mongoose.model('Persona', personaSchema);
