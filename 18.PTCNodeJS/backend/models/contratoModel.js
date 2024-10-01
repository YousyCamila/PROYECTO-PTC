const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  descripcionServicio: {
    type: String,
    maxlength: 255,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaCierre: {
    type: Date,
    required: true
  },
  clausulas: {
    type: String
  },
  tarifa: {
    type: mongoose.Types.Decimal128,
    required: true,
    set: function(value) {
      return mongoose.Types.Decimal128.fromString(value.toString().replace(/\./g, '').replace(',', '.'));
    }
  },
  estado: {
    type: Boolean,
    required: true,
    default: true // Se puede inicializar como activo
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective'
  },
  historial: [{
    fechaDesactivacion: { type: Date, default: Date.now },
    motivo: String // Para registrar el motivo de desactivación
  }]
}, { timestamps: true });

module.exports = mongoose.model('Contrato', contratoSchema);
