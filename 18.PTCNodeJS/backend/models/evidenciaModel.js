const mongoose = require('mongoose');

const evidenciaSchema = new mongoose.Schema({
  fechaEvidencia: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  idCasos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: true,
  },
  tipoEvidencia: {
    type: [String], // Aquí aseguramos que sea un array de strings
    enum: ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'],
    required: true,
  },
  // otros campos según sea necesario
}, { timestamps: true });

const Evidencia = mongoose.model('Evidencia', evidenciaSchema);
module.exports = Evidencia;
