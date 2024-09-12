const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  direccion: {
    type: String,
    maxlength: 255
  },
  idPersona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  casos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso'
  }],
  contratos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato'
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura'
  }],
  formularios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario'
  }],
  historials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Historial'
  }]
});

module.exports = mongoose.model('Cliente', clienteSchema);
