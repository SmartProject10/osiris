const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datosFamiliaresSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nombreCompleto: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
    trim: true
  },
  parentesco: {
    type: String,
    required: [true, 'El parentesco es obligatorio'],
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria'],
    validate: {
      validator: function(value) {
        return value instanceof Date && !isNaN(value);
      },
      message: 'La fecha de nacimiento debe ser una fecha válida'
    }
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    default: 'Otro'
  }
});

module.exports = mongoose.model('DatosFamiliares', datosFamiliaresSchema);
