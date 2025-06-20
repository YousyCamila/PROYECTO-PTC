const mongoose = require('mongoose');

const evidenciaSchema = new mongoose.Schema({
  fechaEvidencia: { type: Date, required: true },
  descripcion: { type: String, required: true },
  idCasos: { type: mongoose.Schema.Types.ObjectId, ref: 'Caso', required: true },
  tipoEvidencia: {
    type: String,
    enum: ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'],
    required: true,
  },
  archivo: {
    nombre: { type: String, required: true }, // Nombre del archivo
    tipo: { type: String, required: true },   // Tipo MIME del archivo (ej. image/jpeg, video/mp4)
    ruta: { type: String, required: true },   // Ruta donde se guarda el archivo
  }
}, { timestamps: true });

const Evidencia = mongoose.model('Evidencia', evidenciaSchema);
module.exports = Evidencia;
