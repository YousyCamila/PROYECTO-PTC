const mongoose = require('mongoose');

const casoSchema = new mongoose.Schema({
  cadenaCustodia: {
    type: String,
    required: true
  },
  investigacionExtorsion: {
    type: String
  },
  estudiosSeguridad: {
    type: String
  },
  investigacionInfidelidades: {
    type: String
  },
  investigacionRobosEmpresariales: {
    type: String
  },
  antecedentes: {
    type: String
  },
  recuperacionVehiculos: {
    type: String
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective'
  },
  evidencias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidencia'
  }],
  registroCasos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroCaso'
  }]
});

module.exports = mongoose.model('Caso', casoSchema);
