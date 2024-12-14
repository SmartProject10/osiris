const mongoose = require('mongoose');

const companyAcquisitionSchema = new mongoose.Schema({
    isoIds:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'iso',
      required: true
    }],
    acquisitionTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'acquisitionType',
      required: true
    },
    acquisitionDate: { type: Date, required: true, default: Date.now },
    expirationDate: { type: Date, default: null },
    InvoiceLink: {type: String, default: null}
});

// Permitir repetir el valor null en los siguientes campos unique
companyAcquisitionSchema.index({ InvoiceLink: 1 }, { unique: true, partialFilterExpression: { InvoiceLink: { $ne: null } } });

//Pre-save hook para calcular expirationDate
companyAcquisitionSchema.pre('save', async function (next) {
  try {
      const acquisitionTypeId = await mongoose.model('acquisitionType').findById(this.acquisitionTypeId);
      if (!acquisitionTypeId) {
          throw new Error('Tipo de adquisición no encontrado');
      }

      const acquisitionTypeName = acquisitionTypeId.acquisitionTypeName;

      if (acquisitionTypeName !== 'Compra') {
          let aditionalMonths;
          switch (acquisitionTypeName) {
            case "Gratuito":
              aditionalMonths = 2;
              break;
            case "Alquiler mensual":
              aditionalMonths = 1;
              break;
            case "Alquiler anual":
              aditionalMonths = 12;
              break;
            default:
              aditionalMonths = 0;
          }
          if(aditionalMonths !=0){
            const expirationDate = new Date(this.acquisitionDate);
            expirationDate.setMonth(expirationDate.getMonth() + aditionalMonths);
            this.expirationDate = expirationDate;
          }
      }
      next();
  } catch (err) {
      next(err);
  }
});


module.exports = mongoose.model('companyAcquisition', companyAcquisitionSchema);