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
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      maxlength: 50,
      required: true
    }
  }],
  historialCasos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HistorialCaso'
    },
    fecha: {
      type: Date,
      required: true
    },
    detalle: {
      type: String,
      required: true
    }
  }],
  activo: { type: Boolean, default: true },
}, { timestamps: true });

DetectiveSchema.add(personaSchema);

// Crea el modelo de Detective
const Detective = mongoose.model('Detective', DetectiveSchema);
module.exports = Detective;
