const mongoose = require('mongoose');
const personaSchema = require('./personaModel');

const clienteSchema = new mongoose.Schema({
  direccion: {
    type: String,
    maxlength: 255,
    required: false // Dirección opcional
  },
  casos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caso',
      required: false // El id del caso es opcional
    },
    nombre: {
      type: String,
      required: false // Nombre del caso opcional
    },
    cantidad: {
      type: Number,
      default: 1, // Contador opcional con valor por defecto
      required: false // Cantidad opcional
    }
  }],
  contratos: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contrato',
      required: false // El id del contrato es opcional
    },
    descripcionServicio: {
      type: String,
      required: false // Descripción del servicio opcional
    },
    estado: {
      type: Boolean,
      required: false // Estado del contrato opcional
    }
  }],
  facturas: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Factura',
      required: false // El id de la factura es opcional
    },
    total: {
      type: Number,
      required: false // Monto total opcional
    },
    estado: {
      type: String,
      maxlength: 50,
      required: false // Estado de la factura opcional
    }
  }],
  historials: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Historial',
      required: false // El id del historial es opcional
    },
    fecha: {
      type: Date,
      required: false // Fecha del historial opcional
    },
    detalle: {
      type: String,
      required: false // Detalle del historial opcional
    }
  }],
  registroCaso: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RegistroCaso',
      required: false // El id del registro de caso es opcional
    },
    descripcion: {
      type: String,
      required: false // Descripción del registro de caso opcional
    },
    estadoRegistro: {
      type: String,
      maxlength: 50,
      required: false // Estado del registro de caso opcional
    }
  }],
  activo: {
    type: Boolean,
    default: true,
    required: false // Campo de activo opcional
  }
}, { timestamps: true });

// Se agrega el schema de persona al cliente
clienteSchema.add(personaSchema);

// Crea el modelo de Cliente
const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
