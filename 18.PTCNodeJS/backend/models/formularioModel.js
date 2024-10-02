const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength: 100,
    required: true
  },
  numeroCelular: {
    type: String,
    maxlength: 10,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaEnvio: {
    type: Date,
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  }
});

module.exports = mongoose.model('Formulario', formularioSchema);
