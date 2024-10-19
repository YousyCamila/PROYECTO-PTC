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
    default: Date.now,
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  correoCliente: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Valida formato de correo electrónico
  },
  respuesta: {  
    type: String,
    default: null // Respuesta del administrador
  }
});

module.exports = mongoose.model('Formulario', formularioSchema);
