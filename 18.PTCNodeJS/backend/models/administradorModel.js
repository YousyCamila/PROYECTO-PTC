const mongoose = require('mongoose');
const personaSchema = require('./personaModel');

const administradorSchema = new mongoose.Schema({
    
    activo: { type: Boolean, default: true },
  
},
{timestamps : true});
administradorSchema.add(personaSchema);

// Crea el modelo de Administrador
const Administrador = mongoose.model('Administrador', administradorSchema);
module.exports = Administrador;
