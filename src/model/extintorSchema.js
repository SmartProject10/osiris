const mongoose = require('mongoose');

const extintorSchema = new mongoose.Schema({
    iId_Extintor:{
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true
    },
    vCodigo: {
        type: String,
        required: true,
        maxlength: 13
    },
    vNroExtintor:{
        type: Number,
        required: true,
        maxlength: 13
    },
    iId_SedeEmpresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sedeEmpresa',
        required: true
    },
    iId_AreaEmpresa:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'areaEmpresa',
        required: true
    },
    iId_TipoExtintor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'tipoExtintor',
        required: true
    },
    vfechaFabricacion: Date,
    vfechaPruebaHidrostatica: Date,
    vfechaRecarga: Date

});

module.exports = mongoose.model('extintor', extintorSchema );