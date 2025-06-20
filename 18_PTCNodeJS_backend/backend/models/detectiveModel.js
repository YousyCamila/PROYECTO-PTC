const personaSchema = require('./personaModel');
const mongoose = require('mongoose');

const DetectiveSchema = new mongoose.Schema({
  especialidad: [{
    type: String,
    required: true
  }],
  casos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caso'
    },
    nombre: {
      type: String,
      required: false
    },
    descripcion: {
      type: String,
      required: false
    },
    estado: {
      type: String,
      maxlength: 50,
      required: false
    }
  }],
  historialCasos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HistorialCaso'
    },
    fecha: {
      type: Date,
      required: false
    },
    detalle: {
      type: String,
      required: false
    }
  }],
  registroCaso: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegistroCaso',
        required: false // El id del registro de caso es opcional
      },
      descripcion: {
        type: String,
        required: false // Descripción del registro de caso opcional
      },
      estadoRegistro: {
        type: String,
        maxlength: 50,
        required: false // Estado del registro de caso opcional
      }
    }],

  contratos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Contrato'
    },
    descripcionServicio: String,
    estado: Boolean
  }]
  ,
  activo: { type: Boolean, default: true },
}, { timestamps: true });

DetectiveSchema.add(personaSchema);

// Crea el modelo de Detective
const Detective = mongoose.model('Detective', DetectiveSchema);
module.exports = Detective;
