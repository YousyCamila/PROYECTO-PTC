const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength: 50,
    required: true
  },
  estado: {
    type: Boolean,
    required: true
  },
  usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
});

module.exports = mongoose.model('Rol', roleSchema);
