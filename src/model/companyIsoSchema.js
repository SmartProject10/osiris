const mongoose = require('mongoose');

const companyIsoSchema = new mongoose.Schema({

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      required: true
    },
  
    iso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'iso',
      required: true
    }
  });

module.exports = mongoose.model('companyIso', companyIsoSchema);