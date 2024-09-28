const mongoose = require('mongoose');
const Persona = require('./personaModel');

const administradorSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    maxlength: 100
  },
  
  registroMantenimientos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroMantenimiento'
  }],
},
  { timestamps: true });

  personaSchema.add(Persona.schema);

module.exports = mongoose.model('Administrador', administradorSchema);
