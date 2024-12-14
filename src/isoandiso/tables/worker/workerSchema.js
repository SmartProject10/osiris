const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name:{
    type: String,
    default: null
  },
  lastname:{
    type: String,
    default: null
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
  password: { type: String, default: null },
  dni: {type: String, required: true},
  mothers_lastname: {type: String, required: true},
  fathers_lastname: {type: String, required: true},
  birthDate: {type: Date, required: true},
  companyAreaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyArea',
    required: true
  },
  charge: {type: String, required: true},
  entryDate: {type: Date, required: true},
  contractTerminationDate : {type: Date, required: true},
  areaEntryDate: {type: Date, required: true},
  address: {type: String, required: true},
  district: {type: String, required: true},
  corporateEmail: {
    type: String,
    required: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  nationalityWorkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nationalityWorker',
    required: true
  },
  gender: { 
    type: String, 
    enum: ['Masculino', 'Femenino'],
    required: true
  },
  civilStatus: { 
    type: String, 
    enum: ['Soltero', 'Casado','Divorciado','Conviviente','Viudo/da'],
    required: true
  },
  personalPhone: {type: String, required: true},
  facialRecognition: {type: String, default: null},
  digitalSignature: {type: String, default: null},
  status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  workSite: {type: String, required: true},
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rol',
    required: true
  },
  sizePants: {type: Number, required: true, min:0,max:99},
  sizePolo: {type: Number, required: true, min:0,max:99},
  sizeShoe: {type: Number, required: true, min:0,max:99},
  companyIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true
  }]
}, 
{ 
  timestamps: true 
});

// Middleware pre-save para convertir el email a minúsculas
workerSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  next();
});

// Manejo de errores de unicidad
workerSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern && error.keyPattern.email) {
      return next(new Error('El email ya existe'));
    }
  }
  next(error);
});

module.exports = mongoose.model('worker', workerSchema);
