const mongoose = require("mongoose");

const datoLaboralesSchema = new mongoose.Schema({
  codigoTrabajador: { type: String, unique: true, trim: true },
  puesto: { type: String, trim: true },
  area: { type: String, trim: true },
  gerencia: { type: String, trim: true },
  servicio: { type: String, trim: true },
  empresa: { type: String, trim: true },
  razonSocial: { type: String, trim: true },
  lugarTrabajo: { type: String, trim: true },
  fechaIngreso: { type: Date },
});

module.exports = mongoose.model("DatoLaborales", datoLaboralesSchema);
