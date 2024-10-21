const mongoose = require('mongoose');

const registroEmpresaSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  contraseña: { type: String, required: true, validate: { validator: validatePasswordLength, message: props => `${props.value} no es una contraseña válida! Debe tener al menos 8 caracteres.`} },
  datoEmpresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'datoEmpresa',
  },
});

//validaciones
function validatePasswordLength(v){
    return v.length >= 8;
}

module.exports = mongoose.model('registroEmpresa', registroEmpresaSchema);