const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
  apellidoPaterno: String,
  apellidoMaterno: String,
  nombres: String,
  direccion: String,
  distrito: String,
  //correoTrabajo: String,
  //correoPersonal: String,
  //nacionalidad: String,
  genero: String,
  estadoCivil: String,
  fechaNacimiento: Date,
  telefonoPersonal: String,
  reconocimientoFacial: String,
  firmaDigital: String,
  area: String,
  cargo: String,
  rollSistemaDigitalizado: String,
  fechaIngresoArea: Date,
  fechaIngresoEmpresa: Date,
  status: String,
  sedeTrabajo: String, 
  dni: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  area: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
  }],
  rol: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
  }],  
},
{ timestamps: true });

module.exports = mongoose.model('Trabajador', trabajadorSchema);
