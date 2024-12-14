const mongoose = require('mongoose');

const acquisitionTypeSchema = new mongoose.Schema({
  name: {type: String,enum: ['Gratuito','Alquiler mensual','Alquiler anual','Compra'], required: true, unique: true},
});

module.exports = mongoose.model('acquisitionType', acquisitionTypeSchema);