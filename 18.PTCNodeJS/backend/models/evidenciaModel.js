const mongoose = require('mongoose');

const evidenciaSchema = new mongoose.Schema({
  fechaEvidencia: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  idCasos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: true
  },
  tipoEvidencia: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoEvidencia'
  }]
});

module.exports = mongoose.model('Evidencia', evidenciaSchema);
