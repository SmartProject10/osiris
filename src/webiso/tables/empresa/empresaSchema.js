const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true,
    validate: {
    validator: function(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    },
    message: props => `${props.value} no es un email válido!`
  }},
  telefono: { type: String, required: true },
  contraseña: { type: String, required: true, 
    validate: { 
      validator: validatePasswordLength,
      message: props => `${props.value} no es una contraseña válida! Debe tener al menos 8 caracteres.`
    } 
  },
  ruc: {type: String, unique: true},
  razonSocial: {type: String},
  paisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pais'
  },
  actividadEconomica: {type: String},
  sectorEconomico: {type: String},
  tamañoEmpresa: {type: String},
  adquisicionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adquisicionEmpresa',
  }],
  sedeEmpresaIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sedeEmpresa',
  }]
},
{
  timestamps: true
});

//VALIDACIONES

//Longitud de la contraseña
function validatePasswordLength(v){
    return v.length >= 8;
}

module.exports = mongoose.model('empresa', empresaSchema);