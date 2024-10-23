const mongoose = require('mongoose');

const subempresaSchema = new mongoose.Schema({
  ruc:{type: String, required: true},
  razonSocial:{type: String, required: true},
  actividadEconómica:{type: String, required: true},
  sectorEconomico:{type: String, required: true},
  tamañoEmpresa:{type: String, required: true},
  fechaDeIngreso:{type: Date, required: true},
  fechaDeTerminoDeContrato:{type: Date, required: true},
});

module.exports = mongoose.model('subempresa', subempresaSchema);