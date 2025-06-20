// models/Persona.js
const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
  tipoDocumento: {
    type: String,
    required: true,
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true
  },
  nombres: {
    type: String,
    maxlength: 100,
    required: true
  },
  apellidos: {
    type: String,
    maxlength: 100,
    required: true
  },
  correo: {
    type: String,
    maxlength: 100,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: false
  }
}, 
{timestamps: true});

module.exports =  PersonaSchema;
