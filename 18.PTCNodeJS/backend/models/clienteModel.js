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
      required: true
    }
  }],
  contratos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contrato'
    },
    descripcionServicio: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      maxlength: 50,
      required: true
    }
  }],
  facturas: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Factura'
    },
    total: {
      type: Number,
      required: true
    },
    estado: {
      type: String,
      maxlength: 50,
      required: true
    }
  }],
  historials: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Historial'
    },
    fecha: {
      type: Date,
      required: true
    },
    detalle: {
      type: String,
      required: true
    }
  }],
  registroCaso: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RegistroCaso'
    },
    descripcion: {
      type: String,
      required: true
    },
    estadoRegistro: {
      type: String,
      maxlength: 50,
      required: true
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
