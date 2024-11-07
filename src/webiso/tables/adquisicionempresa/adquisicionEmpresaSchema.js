const mongoose = require('mongoose');

const adquisicionEmpresaSchema = new mongoose.Schema({
    isoIds:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'iso',
      required: true
    }],
    tipoDeAdquisicionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tipoDeAdquisicion',
      required: true
    },
    fechaAdquisicion: { type: Date, required: true, default: Date.now },
    fechaVencimiento: { type: Date },
    linkFactura: {type: String}
});

//Pre-save hook para calcular fechaVencimiento
adquisicionEmpresaSchema.pre('save', async function (next) {
  try {
      const tipoDeAdquisicion = await mongoose.model('tipoDeAdquisicion').findById(this.tipoDeAdquisicionId);
      if (!tipoDeAdquisicion) {
          throw new Error('Tipo de adquisición no encontrado');
      }

      const tipoNombre = tipoDeAdquisicion.nombre;

      if (tipoNombre === 'Alquiler' || tipoNombre === 'Gratuito') {
          //Si es "Alquiler" o "Gratuito", sumamos 2 meses a fechaAdquisicion
          const fechaVencimiento = new Date(this.fechaAdquisicion);
          fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 2);
          this.fechaVencimiento = fechaVencimiento;
      } else if (tipoNombre === 'Compra') {
          //Si es "Compra", ponemos null en fechaVencimiento
          this.fechaVencimiento = null;
      }

      next();
  } catch (err) {
      next(err);
  }
});


module.exports = mongoose.model('adquisicionEmpresa', adquisicionEmpresaSchema);