const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  descripcionServicio: {
    type: String,
    maxlength: 255,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaCierre: {
    type: Date,
    required: true
  },
  clausulas: {
    type: String
  },
  tarifa: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  estado: {
    type: Boolean,
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  idDetective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective'
  },
},
  {timestamps:true});

module.exports = mongoose.model('Contrato', contratoSchema);
