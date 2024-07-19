const mongoose = require('mongoose');

const companyAreaSchema = new mongoose.Schema({
  // Reference to the Company document
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },

  // Reference to the Area document
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'areaEmpresa',
    required: true
  }
});

module.exports = mongoose.model('CompanyArea', companyAreaSchema);
