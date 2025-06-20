const mongoose = require('mongoose');

const tipoEvidenciaSchema = new mongoose.Schema({
  tipoDocumento: {
    type: String,
    maxlength: 50,
    required: true
  },
  tipoFotografia: {
    type: String,
    maxlength: 50
  },
  tipoVideo: {
    type: String,
    maxlength: 50
  },
  tipoAudio: {
    type: String,
    maxlength: 50
  },
  archivosDigitales: {
    type: String,
    maxlength: 50
  }
}, { timestamps: true });

module.exports = mongoose.model('TipoEvidencia', tipoEvidenciaSchema);
