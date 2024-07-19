const mongoose = require('mongoose');

const sedeSchema = new mongoose.Schema({
  iId_Sede: {
    type: Number,
    required: true,
    unique: true, 
    autoincrement: true
  },
  iId_Ubigeo: {
    type: Number,
    required: false
  },
  iId_Estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo'] 
  },
  vNombre: {
    type: String,
    required: true
  },
  vDireccion: {
    type: String,
    required: false 
  }
});

module.exports = mongoose.model('sede', sedeSchema);
