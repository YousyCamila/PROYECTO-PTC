const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  dni: {
    type: String,
    maxlength: 20,
    required: true
  },
  nombres: {
    type: String,
    maxlength: 100,
    required: true
  },
  apellidos: {
    type: String,
    maxlength: 100,
    required: true
  },
  correo: {
    type: String,
    maxlength: 100,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Administrador'
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  detective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective'
  }
});

module.exports = mongoose.model('Persona', personaSchema);
