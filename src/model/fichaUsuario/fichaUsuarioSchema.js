const mongoose = require("mongoose");

const fichaUsuarioSchema = new mongoose.Schema(
  {
    // Referencias a otros modelos
    usuario: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "persona",
        required: false,
      },
    ],
    empresa: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: false,
      },
    ],
    datoPersonales: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DatoPersonales",
      required: false,
    },
    datoLaborales: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DatoLaborales",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

fichaUsuarioSchema.index({ "datosPersonales.correoPersonal": 1 });
fichaUsuarioSchema.index({ "datosLaborales.codigoTrabajador": 1 });

module.exports = mongoose.model("FichaUsuarios", fichaUsuarioSchema);
