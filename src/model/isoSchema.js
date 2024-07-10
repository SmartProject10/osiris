const mongoose = require('mongoose');

const isoSchema = new mongoose.Schema({
  iId_iso: { type: Number, required: true },
  iId_Estado: { type: Number, required: true },
  iId_Pais: { type: Number },
  vNombre: { type: String, required: true, maxlength: 50 },
  vDescripcion: { type: String },
  dFechaRegistro: { type: Date, default: Date.now },
  isos: [{ // Array of ISO IDs
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Iso'
  }]
});


const certificationSchema = new mongoose.Schema({
    iId_Certificacion: { type: Number, required: true, unique: true },
    iId_Empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    iId_Iso: { type: mongoose.Schema.Types.ObjectId, ref: 'Iso', required: true },
    dFechaCertificacion: { type: Date },
    dFechaVencimiento: { type: Date },
    vOrganismoCertificador: { type: String }
  });
  
const Iso = mongoose.model('Iso', isoSchema);
const Certification = mongoose.model('Certification', certificationSchema);
  

module.exports = [Iso, Certification];