const mongoose = require('mongoose');

const nacionalidadSchema = new mongoose.Schema({
    nombre: {type: String, unique: true, required: true},
});

module.exports = mongoose.model('nacionalidad', nacionalidadSchema);
