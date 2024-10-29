const mongoose = require('mongoose');

const rolTrabajadorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('rolTrabajador', rolTrabajadorSchema);