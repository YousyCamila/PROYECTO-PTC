const mongoose = require('mongoose');
const personaSchema = require('./personaModel');

const clienteSchema = new mongoose.Schema({
  direccion: {
    type: String,
    maxlength: 255
  },
  casos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caso'
    },
    nombre: String
  }],
  contratos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato'
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura'
  }],
  historials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Historial'
  }],
  registroCaso:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroCaso'
  }],
  activo: { type: Boolean, default: true },
},
  { timestamps: true });

  clienteSchema.add(personaSchema);

// Crea el modelo de Administrador
const Cliente = mongoose.model('Cliente', clienteSchema);
  module.exports = Cliente;

