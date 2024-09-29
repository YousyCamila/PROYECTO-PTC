const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
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
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective',
    required: true
  }
}, 
{ timestamps: true });

const Historial = mongoose.models.Historial || mongoose.model('Historial', historialSchema);

module.exports = Historial;
