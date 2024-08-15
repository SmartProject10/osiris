const mongoose = require("mongoose");

const datosPersonalesSchema = new mongoose.Schema({
  imagen: { type: String, trim: true },
  nombre: { type: String, trim: true, required: true },
  apellido: { type: String, trim: true, required: true },
  fechaNacimiento: { type: Date, required: true },
  sexo: {
    type: String,
    enum: ["Masculino", "Femenino", "Otro"],
    default: "Otro",
  },
  correoPersonal: {
    type: String,
    required: [true, "El correo es obligatorio"],
    trim: true,
    match: [/.+\@.+\..+/, "Por favor ingrese un correo válido"],
  },
  direccionDomicilio: { type: String, trim: true },
  estadoCiudad: { type: String, trim: true },
  celularPersonal: { type: String, trim: true },
  telefonoCasa: { type: String, trim: true },
  celularTrabajo: { type: String, trim: true },
});

module.exports = mongoose.model("DatoPersonales", datosPersonalesSchema);
