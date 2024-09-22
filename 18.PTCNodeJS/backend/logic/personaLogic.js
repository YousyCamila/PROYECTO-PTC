const Persona = require('../models/personaModels');

// Función para crear una nueva persona
async function crearPersona(body) {
    const personaExistente = await Persona.findOne({ dni: body.dni });

    if (personaExistente) {
        throw new Error('Ya existe una persona con el DNI especificado.');
    }

    const persona = new Persona(body);
    return await persona.save();
}

// Función para obtener todas las personas
async function obtenerPersonas() {
    return await Persona.find().populate('idUsuario administrador cliente detective');
}

// Función para obtener una persona por correo electrónico
async function obtenerPersonaPorEmail(email) {
    const persona = await Persona.findOne({ correo: email }).populate('idUsuario administrador cliente detective');

    if (!persona) {
        throw new Error('Persona no encontrada');
    }
    return persona;
}

// Función para actualizar una persona por ID
async function actualizarPersona(id, body) {
    const persona = await Persona.findByIdAndUpdate(id, body, { new: true }).populate('idUsuario administrador cliente detective');

    if (!persona) {
        throw new Error('Persona no encontrada');
    }
    return persona;
}

// Función para eliminar una persona por ID
async function eliminarPersona(id) {
    const persona = await Persona.findByIdAndDelete(id);

    if (!persona) {
        throw new Error('Persona no encontrada');
    }
    return { message: 'Persona eliminada' };
}

module.exports = {
    crearPersona,
    obtenerPersonas,
    obtenerPersonaPorEmail,
    actualizarPersona,
    eliminarPersona,
};
