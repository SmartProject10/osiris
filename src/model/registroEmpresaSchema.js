const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registroEmpresaSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true,
    validate: {
    validator: function(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validación del formato de email
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
  datoEmpresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'datoEmpresa',
  },
});

//VALIDACIONES

// Longitud de la contraseña
function validatePasswordLength(v){
    return v.length >= 8;
}

// Encriptar la contraseña antes de guardar
registroEmpresaSchema.pre('save', async function(next) {
  if (this.isModified('contraseña')) {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
  }
  next();
});

module.exports = mongoose.model('registroEmpresa', registroEmpresaSchema);