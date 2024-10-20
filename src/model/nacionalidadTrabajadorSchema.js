const mongoose = require('mongoose');

const nacionalidadTrabajadorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
});

module.exports = mongoose.model('nacionalidadTrabajador', nacionalidadTrabajadorSchema);
