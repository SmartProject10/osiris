const mongoose = require('mongoose');

const datosFamiliaresSchema = new mongoose.Schema({
  fichaUsuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FichaUsuarios',
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
