// models/Detective.js
const personaSchema = require('./personaModel');
const mongoose = require('mongoose');

const DetectiveSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    required: true
  },
  casos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caso'
    },
    nombre: String
  }],
  activo: { type: Boolean, default: true },
},
{timestamps: true});

DetectiveSchema.add(personaSchema);

// Crea el modelo de Administrador
const Detective = mongoose.model('Detective', DetectiveSchema);
  module.exports = Detective;

