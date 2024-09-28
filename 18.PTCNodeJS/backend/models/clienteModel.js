const mongoose = require('mongoose');
const Persona = require ('./personaModel');

const clienteSchema = new mongoose.Schema({
  direccion: {
    type: String,
    maxlength: 255
  },
  casos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso'
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
},
  { timestamps: true });

  personaSchema.add(Persona.schema);


module.exports = mongoose.model('Cliente', clienteSchema);
