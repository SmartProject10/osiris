const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  iId_Estado: {
    type: Number,
    required: true,
    enum: [1, 2], // 1: Activo, 2: Inactivo
    default: 1
  },
  vName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('rol', rolSchema);
