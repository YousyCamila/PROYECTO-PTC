const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
  fechaActividad: {
    type: Date,
    required: true
  },
  descripcionActividad: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    required: true
  },
  horaActividad: {
    type: Date,
    required: true
  },
  detallesAdicionales: {
    type: String
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

module.exports = mongoose.model('Auditoria', auditoriaSchema);
