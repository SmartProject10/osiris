const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: `El email no es un email válido!`
    }
  },
  telefono: { type: String, required: true },
  contraseña: { type: String, required: true },
  ruc: { type: String, default: null },
  razonSocial: { type: String },
  paisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pais'
  },
  actividadEconomica: { type: String },
  sectorEconomico: { type: String },
  tamañoEmpresa: { type: String },
  adquisicionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adquisicionEmpresa',
  }],
  sedeEmpresaIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sedeEmpresa',
  }]
},
{
  timestamps: true
});

// Permitir que el campo de valor único ruc acepte repetir el valor null
empresaSchema.index({ ruc: 1 }, { unique: true, partialFilterExpression: { ruc: { $ne: null } } });

// Middleware pre-save para convertir el email a minúsculas
empresaSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  next();
});

// Manejo de errores de unicidad
empresaSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern && error.keyPattern.email) {
      return next(new Error('El email ya existe'));
    }
  }
  next(error);
});

module.exports = mongoose.model('empresa', empresaSchema);
