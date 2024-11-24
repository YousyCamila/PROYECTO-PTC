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
      required: false // Nombre del caso
    },
    cantidad: {
      type: Number,
      default: 1 // Contador de cuántos casos tiene el cliente
    }
  }],
  contratos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Contrato'
    },
    descripcionServicio: String,
    estado: Boolean
  }],
  
  facturas: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Factura'
    },
    total: {
      type: Number,
      required: false // Monto total de la factura
    },
    estado: {
      type: String,
      maxlength: 50,
      required: false // Estado de la factura
    }
  }],
  historials: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Historial'
    },
    fecha: {
      type: Date,
      required: false // Fecha del historial
    },
    detalle: {
      type: String,
      required: false // Detalle del historial
    }
  }],
  registroCaso: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RegistroCaso'
    },
    descripcion: {
      type: String,
      required: false // Descripción del registro de caso
    },
    estadoRegistro: {
      type: String,
      maxlength: 50,
      required: false // Estado del registro de caso
    }
  }],
  activo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });


// Se agrega el schema de persona al cliente
clienteSchema.add(personaSchema);

// Crea el modelo de Cliente
const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;

