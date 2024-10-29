const mongoose = require('mongoose');

const trabajadorSubempresaSchema = new mongoose.Schema({
  dni: {type: String, required: true},
  nombres: {type: String, required: true},
  apellidoMaterno: {type: String, required: true},
  apellidoPaterno: {type: String, required: true},
  fechaNacimiento: {type: Date, required: true},
  nombreProyecto:{type: String, required: true},
  cargo: {type: String, required: true},
  fechaIngresoEmpresa: {type: Date, required: true},
  direccion: {type: String, required: true},
  distrito: {type: String, required: true},
  emailCorporativo: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  emailPersonal: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  nacionalidadTrabajadorId: {
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
  tallaPantalon: {type: Number, required: true, min:0,max:99},
  tallaPolo: {type: Number, required: true, min:0,max:99},
  tallaZapato: {type: Number, required: true, min:0,max:99},
}, { timestamps: true });

module.exports = mongoose.model('TrabajadorSubempresa', trabajadorSubempresaSchema);
