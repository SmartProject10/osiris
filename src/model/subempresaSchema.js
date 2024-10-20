const mongoose = require('mongoose');

const subempresaSchema = new mongoose.Schema({
  ruc:{type: String, required: true},
  razónSocial:{type: String, required: true},
  actividadEconómica:{type: String, required: true},
  sectorEconómico:{type: String, required: true},
  tamañoEmpresa:{type: String, required: true},
  fechaDeIngreso:{type: Date, required: true},
  fechaDeTerminoDeContrato:{type: Date, required: true},
  pdfContrato:{type: String, required: true},
});

module.exports = mongoose.model('subempresa', subempresaSchema);