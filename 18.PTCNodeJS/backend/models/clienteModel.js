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
    nombre: {
      type: String,
      required: false // Cambiado a false
    }
  }],
  contratos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contrato'
    },
    descripcionServicio: {
      type: String,
      required: false // Cambiado a false
    },
    estado: {
      type: String,
      maxlength: 50,
      required: false // Cambiado a false
    }
  }],
  facturas: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Factura'
    },
    total: {
      type: Number,
      required: false // Cambiado a false
    },
    estado: {
      type: String,
      maxlength: 50,
      required: false // Cambiado a false
    }
  }],
  historials: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Historial'
    },
    fecha: {
      type: Date,
      required: false // Cambiado a false
    },
    detalle: {
      type: String,
      required: false // Cambiado a false
    }
  }],
  registroCaso: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RegistroCaso'
    },
    descripcion: {
      type: String,
      required: false // Cambiado a false
    },
    estadoRegistro: {
      type: String,
      maxlength: 50,
      required: false // Cambiado a false
    }
  }],
  activo: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

clienteSchema.add(personaSchema);

// Crea el modelo de Cliente
const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
