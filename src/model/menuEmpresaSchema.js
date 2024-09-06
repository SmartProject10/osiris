const mongoose = require('mongoose');

const menuEmpresaSchema = new mongoose.Schema({
  iId_Estado: {
    type: Number,
    required: true,
    enum: [1, 2], // 1: Activo, 2: Inactivo
    default: 1
  },
  vLink: {
    type: String,
    required: false
  },
  vNombre: {
    type: String,
    required: true
  },
  vIcono: {
    type: String,
    required: true
  },
  vIdiomaCOD: {
    type: String,
    required: true
  },
  videntificadorusuario: {
    type: String,
    required: false
  },
  submenusarray: [
    {
        iId_Estado: {
            type: Number,
            required: true,
            enum: [1, 2], // 1: Activo, 2: Inactivo
            default: 1
        },
        vLink: {
            type: String,
            required: false
          },
          vNombre: {
            type: String,
            required: true
          },
          vIcono: {
            type: String,
            required: true
          },
    }
  ]
});

module.exports = mongoose.model('menuEmpresa', menuEmpresaSchema);
