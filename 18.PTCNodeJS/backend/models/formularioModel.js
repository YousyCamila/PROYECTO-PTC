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
    default: Date.now, // Se establece la fecha actual por defecto
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  correo: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo electrónico válido.'] // Validación de correo
  }
});

module.exports = mongoose.model('Formulario', formularioSchema);
