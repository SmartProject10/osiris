const mongoose = require('mongoose');

const sedeEmpresaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true 
  },
  ciudad: {
    type: String,
    required: true
  },
  provincia: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model('sedeEmpresa', sedeEmpresaSchema);
