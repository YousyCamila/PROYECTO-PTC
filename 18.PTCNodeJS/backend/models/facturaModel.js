const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  fechaEmision: {
    type: Date,
    required: true
  },
  estadoPago: {
    type: String,
    maxlength: 50,
    required: true
  },
  descripcionServicio: {
    type: String,
    maxlength: 255,
    required: true
  },
  totalPagar: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  }
});

module.exports = mongoose.model('Factura', facturaSchema);
