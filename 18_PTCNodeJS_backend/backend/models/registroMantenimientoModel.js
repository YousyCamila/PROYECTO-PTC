const mongoose = require('mongoose');

const registroMantenimientoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFinal: {
    type: Date
  },
  estado: {
    type: Boolean,
    required: true
  },
  idAdministrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Administrador',
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('RegistroMantenimiento', registroMantenimientoSchema);
