const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    maxlength: 100,
    required: true,
    match: /.+\@.+\..+/ // Validación básica
  },
  telefono: {
    type: String,
    maxlength: 20,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    required: true
  },
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  auditoria: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auditoria'
  }],
  personas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona'
  }]
});

// Hash de la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Método para generar JWT
usuarioSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, rolId: this.rolId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model('Usuario', usuarioSchema);

