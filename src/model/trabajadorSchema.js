const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
  dni: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  nombres: String,
  direccion: String,
  distrito: String,
  correoTrabajo: String,
  correoPersonal: String,
  nacionalidad: String,
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
  sedeTrabajo: String
}, { timestamps: true });

module.exports = mongoose.model('Trabajador', trabajadorSchema);
