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
    maxlength: 50,
    required: true
  },
  seguimientoPorcentaje: {
    type: mongoose.Types.Decimal128
  },
  idCasos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: true
  }
});

module.exports = mongoose.model('RegistroCaso', registroCasoSchema);
