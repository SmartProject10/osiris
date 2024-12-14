const mongoose = require('mongoose');

const subcompanyWorkerSchema = new mongoose.Schema({
  dni: {type: String, required: true},
  name: {type: String, required: true},
  mothers_lastname: {type: String, required: true},
  fathers_lastname: {type: String, required: true},
  birthDate: {type: Date, required: true},
  projectName:{type: String, required: true},
  charge: {type: String, required: true},
  entryDate: {type: Date, required: true},
  address: {type: String, required: true},
  district: {type: String, required: true},
  corporateEmail: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  personalEmail: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@gmail\.com$/,
  },
  nationalityWorkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nationalityWorker',
    default: null
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
  facialRecognition: {type: String, required: true},
  digitalSignature: {type: String, required: true},
  status: { 
    type: String, 
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  workSite: {type: String, required: true},
  sizePants: {type: Number, required: true, min:0,max:99},
  sizePolo: {type: Number, required: true, min:0,max:99},
  sizeShoe: {type: Number, required: true, min:0,max:99},
});

module.exports = mongoose.model('subcompanyWorker', subcompanyWorkerSchema);
