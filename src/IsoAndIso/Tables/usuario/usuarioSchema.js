
const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  contraseña: { type: String, required: true, 
    validate: { 
      validator: validatePasswordLength,
      message: props => `${props.value} no es una contraseña válida! Debe tener al menos 8 caracteres.`
    } 
  }
},
{
  timestamps: true
}
);

//VALIDACIONES

//Longitud de la contraseña
function validatePasswordLength(v){
  return v.length >= 8;
}

module.exports = mongoose.model('usuario', usuarioSchema);;
