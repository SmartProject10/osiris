const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
  nombre:{
    type: String,
  },
  apellido:{
    type: String,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.endsWith('@gmail.com');
      },
      message: `El email debe ser una dirección de Gmail válida`
    }
  },
  contraseña: { type: String },
  dni: {type: String, required: true},
  apellidoMaterno: {type: String, required: true},
  apellidoPaterno: {type: String, required: true},
  fechaNacimiento: {type: Date, required: true},
  areaEmpresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'areaEmpresa',
    required: true
  },
  cargo: {type: String, required: true},
  fechaIngresoEmpresa: {type: Date, required: true},
  fechaDeTerminoDeContrato : {type: Date, required: true},
  fechaIngresoÁrea: {type: Date, required: true},
  direccion: {type: String, required: true},
  distrito: {type: String, required: true},
  emailCorporativo: {
    type: String,
    required: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  nacionalidadTrabajadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nacionalidadTrabajador',
    required: true
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
  reconocimientoFacial: {type: String},
  firmaDigital: {type: String},
  status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  sedeDeTrabajo: {type: String, required: true},
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rol',
    required: true
  },
  tallaPantalon: {type: Number, required: true, min:0,max:99},
  tallaPolo: {type: Number, required: true, min:0,max:99},
  tallaZapato: {type: Number, required: true, min:0,max:99},
  empresaIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'empresa',
    required: true
  }]
}, 
{ 
  timestamps: true 
});

// Middleware pre-save para convertir el email a minúsculas
trabajadorSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  next();
});

// Manejo de errores de unicidad
trabajadorSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern && error.keyPattern.email) {
      return next(new Error('El email ya existe'));
    }
  }
  next(error);
});

module.exports = mongoose.model('trabajador', trabajadorSchema);
