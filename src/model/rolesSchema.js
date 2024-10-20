const mongoose = require('mongoose');

const rolUsuarioSchema = new mongoose.Schema({
  iId_Estado: {
    type: Number,
    required: true,
    enum: [0,1], // 1: Activo, 0: Inactivo
    default: 1
  },
  vName: {
    type: String,
    required: true
  },
  vOrder: {
    type: Number,
    required: true,
    enum: [0,1,2], // 0: Trabajador, 1: Responsable, 2: Super Admin
    unique: true,
  }
});

module.exports = mongoose.model('roles', rolUsuarioSchema);