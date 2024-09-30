const mongoose = require('mongoose');

const casoSchema = new mongoose.Schema({
  nombreCaso: {
    type: String,
    required: true,
    enum: [ // Lista de nombres de casos permitidos
      'cadenaCustodia',
      'investigacionExtorsion',
      'estudiosSeguridad',
      'investigacionInfidelidades',
      'investigacionRobosEmpresariales',
      'antecedentes',
      'recuperacionVehiculos'
    ],
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective',
  },
  evidencias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidencia',
  }],
  registroCasos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroCaso',
  }],
  activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Caso', casoSchema);
