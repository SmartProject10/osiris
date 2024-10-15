const mongoose = require('mongoose');

const companySiteSchema = new mongoose.Schema({
  vName: {
    type: String,
    required: true
  },
  vAddress: {
    type: String,
    required: true 
  },
  vCity: {
    type: String,
    required: true
  },
  vProvince: {
    type: String,
    required: true 
  },
});

module.exports = mongoose.model('companySite', companySiteSchema);
