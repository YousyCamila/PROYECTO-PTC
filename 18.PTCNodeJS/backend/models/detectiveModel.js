const mongoose = require('mongoose');

const detectiveSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    maxlength: 100
  },
  idPersona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  casos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso'
  }],
  contratos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato'
  }]
});

module.exports = mongoose.model('Detective', detectiveSchema);
