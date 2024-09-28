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
  Usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
});


module.exports = mongoose.model('Persona', personaSchema);
