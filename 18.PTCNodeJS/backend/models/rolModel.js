const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength: 50,
    required: true
  },
  estado: {
    type: Boolean,
    required: true,
    default: true, 
  },
  usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
},
  { timestamps: true }) ;

module.exports = mongoose.model('Rol', roleSchema);
