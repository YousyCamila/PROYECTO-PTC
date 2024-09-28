const mongoose = require('mongoose');
const Persona = require('./personaModel');

const detectiveSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    maxlength: 100
  },
  casos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso'
  }],
  contratos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato'
  }],
  registroCaso: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroCaso'
  }],
},
 {timestamps: true});

 personaSchema.add(Persona.schema);



module.exports = mongoose.model('Detective', detectiveSchema);
