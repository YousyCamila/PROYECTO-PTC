const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    maxlength: 100,
    required: true
  },
  telefono: {
    type: String,
    maxlength: 20,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    required: true
  },
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  auditoria: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auditoria'
  }],
  personas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona'
  }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);
