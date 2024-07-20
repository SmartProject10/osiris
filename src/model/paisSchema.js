const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
  vCodigo: {
    type: String,
    required: true,
    unique: true, // Unique index based on table definition
    maxlength: 11, // Varchar length from table definition
  },
  vCodigoMovil: {
    type: String,
    required: true,
    unique: true, // Unique index based on table definition
    maxlength: 5, // Varchar length from table definition
  },
  vDescripcion: {
    type: String,
    required: true,
    maxlength: 50, // Varchar length from table definition
  },
  iId_Estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo'], // Enum based on table note
  },
  vBanderaUrl:{
    type: String,
    required: false,
    maxlength: 50, // Varchar length from table definition
  }
});

module.exports = mongoose.model('pais', paisSchema);
