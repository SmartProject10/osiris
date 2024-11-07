
const mongoose = require('mongoose');

const objetivoGeneralSchema = new mongoose.Schema({
  objetivoGeneral: {
    type: String,
    required: true,
  },
  meta: {
    type: String,
    required: true,
  },
  indicadores: {
    type: String,
    required: true,
  },
  presupuesto: {
    type: String,
    required: true,
  },
  rescursos: {
    type: String,
    required: true,
  },
}
);

module.exports = mongoose.model('objetivoGeneral', objetivoGeneralSchema);;
