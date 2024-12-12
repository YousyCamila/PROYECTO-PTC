const mongoose = require('mongoose');

const casoSchema = new mongoose.Schema({
  nombreCaso: {
    type: String,
    required: true,
    enum: [
      'Cadena de custodia',
      'Investigación de extorsión',
      'Estudios de seguridad',
      'Investigación de infidelidades',
      'Investigación de robos empresariales',
      'Antecedentes',
      'Recuperación de vehículos'
    ],
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  nombreCliente: {
    type: String,
    required: true, // Asegúrate de capturar este dato al crear un caso
  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective',
  },
  nombreDetective: {
    type: String,
    default: null, // Puede ser opcional si el detective no está asignado al inicio
  },
  evidencias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidencia',
  }],
  registroCasos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroCaso',
  }],
  activo: { 
    type: Boolean, 
    default: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Caso', casoSchema);