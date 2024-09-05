const mongoose = require('mongoose')

const KitDerramesSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true, // Campo requerido
  },
  sede: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  listaVehiculos: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0 // Validación personalizada: el array debe tener al menos un elemento
      },
      message: 'El campo listaVehiculos debe contener al menos un vehículo.',
    },
  },
  materiales: {
    type: {
      unidad: { type: Boolean, required: true },
      cantidad: { type: Number, required: true },
      nombre: { type: String, required: true },
    },
    required: true,
  },
})

const kitDerrames = mongoose.model('KitDerrames', KitDerramesSchema)

module.exports = kitDerrames
