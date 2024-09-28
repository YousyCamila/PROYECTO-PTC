const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    especialidad: { type: String, maxlength: 100 },
    personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true }, // Nuevo campo
    registroMantenimientos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RegistroMantenimiento' }]
}, { timestamps: true });

module.exports = mongoose.model('Administrador', administradorSchema);
