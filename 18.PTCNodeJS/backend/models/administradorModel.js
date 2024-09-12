const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    maxlength: 100
  },
  idPersona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  registroMantenimientos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroMantenimiento'
  }]
});

module.exports = mongoose.model('Administrador', administradorSchema);
