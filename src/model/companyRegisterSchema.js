const mongoose = require('mongoose');

const companyRegisterSchema = new mongoose.Schema({
  vEmail: { type: String, required: true, unique: true },
  vPhoneNumber: { type: String, required: true },
  vPassword: { type: String, required: true, validate: { validator: validatePasswordLength, message: props => `${props.value} no es una contraseña válida! Debe tener al menos 8 caracteres.`} },
  companyData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyData',
  },
});

//validaciones
function validatePasswordLength(v){
    return v.length >= 8;
}

module.exports = mongoose.model('companyRegister', companyRegisterSchema);