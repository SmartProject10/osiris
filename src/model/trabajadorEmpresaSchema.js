const mongoose = require('mongoose');

const trabajadorEmpresaSchema = new mongoose.Schema({
  dni: {type: String, required: true},
  nombres: {type: String, required: true},
  apellidoMaterno: {type: String, required: true},
  apellidoPaterno: {type: String, required: true},
  fechaNacimiento: {type: Date, required: true},
  area: {type: String, required: true},
  cargo: {type: String, required: true},
  fechaIngresoEmpresa: {type: Date, required: true},
  fechaIngresoÁrea: {type: Date, required: true},
  direccion: {type: String, required: true},
  distrito: {type: String, required: true},
  emailCorporativo: {type: String, required: true},
  emailPersonal: {type: String, required: true},
  nacionalidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nacionalidadTrabajador',
  },
  genero: { 
    type: String, 
    enum: ['Masculino', 'Femenino'],
    required: true
  },
  estadoCivil: { 
    type: String, 
    enum: ['Soltero', 'Casado','Divorciado','Conviviente','Viudo/da'],
    required: true
  },
  telefonoPersonal: {type: String, required: true},
  reconocimientoFacial: {type: String, required: true},
  firmaDigital: {type: String, required: true},
  status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  sedeDeTrabajo: {type: String, required: true},
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rol',
  },
}, { timestamps: true });

module.exports = mongoose.model('TrabajadorEmpresa', trabajadorEmpresaSchema);
