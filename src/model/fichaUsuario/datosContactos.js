const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema({
  fichaUsuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FichaUsuarios",
    required: true,
  },
  direccionActualizada: {
    type: String,
    trim: true,
  },
  personaContacto: {
    type: String,
    trim: true,
  },
  ocupacionLugarTrabajo: {
    type: String,
    trim: true,
  },
  celular: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("DatosContactos", sedeSchema);
