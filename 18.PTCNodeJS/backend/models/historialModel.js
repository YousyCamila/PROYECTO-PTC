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
  }
});

module.exports = mongoose.model('Historial', historialSchema);
