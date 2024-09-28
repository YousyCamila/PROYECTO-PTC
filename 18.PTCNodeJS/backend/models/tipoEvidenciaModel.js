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
  },
  idEvidencia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidencia',
    required: true
  }
},
{timestamps: true});

module.exports = mongoose.model('TipoEvidencia', tipoEvidenciaSchema);
