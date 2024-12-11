const mongoose = require('mongoose');

const registroCasoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFinalizacion: {
    type: Date
  },
  estadoRegistro: {
    type: String,
    enum: ['Comenzando', 'En Progreso', 'Finalizando'], // Valores permitidos
    required: true
  },
  seguimientoPorcentaje: {
    type: mongoose.Types.Decimal128
  },
  idCasos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',

  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective',

  }
},
{ timestamps: true });

module.exports = mongoose.model('RegistroCaso', registroCasoSchema);
