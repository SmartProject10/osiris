const mongoose = require('mongoose');

const sedeSchema = new mongoose.Schema({
  iId_Sede: {
    type: Number,
    required: true,
    unique: true, // Enforces primary key constraint
    autoincrement: true // Configured at collection level (see note below)
  },
  iId_Ubigeo: {
    type: Number,
    required: false // Adjust as needed
  },
  iId_Pais: {
    type: Number,
    required: false // Adjust as needed
  },
  iId_Empresa: {
    type: Number,
    required: false // Adjust as needed
  },
  iId_Estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo'] // Enforces valid states
  },
  vNombre: {
    type: String,
    required: true
  },
  dFechaRegistro: {
    type: Date,
    required: false // Adjust as needed
  },
  vDireccion: {
    type: String,
    required: false // Adjust as needed
  }
});

module.exports = mongoose.model('sede', sedeSchema);
