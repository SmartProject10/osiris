const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sedeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  direccionActualizada: {
    type: String,
    trim: true
  },
  personaContacto: {
    type: String,
    trim: true
  },
  ocupacionLugarTrabajo: {
    type: String,
    trim: true
  },
  celular: {
    type: String,
    trim: true,
    validate: {
      validator: function(value) {
        return /\d{10}/.test(value); // Valida que el número de celular tenga 10 dígitos
      },
      message: 'El número de celular debe tener 10 dígitos'
    }
  }
});

module.exports = mongoose.model('DatosContactos', sedeSchema);
