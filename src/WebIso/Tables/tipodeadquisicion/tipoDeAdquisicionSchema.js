const mongoose = require('mongoose');

const tipoDeAdquisicionSchema = new mongoose.Schema({
  nombre: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('tipoDeAdquisicion', tipoDeAdquisicionSchema);