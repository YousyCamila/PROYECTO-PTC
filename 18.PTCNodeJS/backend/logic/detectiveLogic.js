const Detective = require('../models/detectiveModel');
const Persona = require('../models/personaModel'); // Asegúrate de importar el modelo de Persona

// Función para crear un nuevo detective
async function crearDetective(body) {
    // Verifica si ya existe un detective asociado a la persona especificada
    const detectiveExistente = await Detective.findOne({ idPersona: body.idPersona });

    if (detectiveExistente) {
        throw new Error('Ya existe un detective asociado a la persona especificada.');
    }

    const detective = new Detective(body);
    return await detective.save();
}

// Función para obtener todos los detectives
async function obtenerDetectives() {
    return await Detective.find().populate('idPersona casos contratos');
}

// Función para obtener un detective por email de la persona asociada
async function obtenerDetectivePorEmail(email) {
    // Buscar la persona por email
    const persona = await Persona.findOne({ email });

    if (!persona) {
        throw new Error('No se encontró ninguna persona con el email especificado');
    }

    // Buscar el detective utilizando el `idPersona`
    const detective = await Detective.findOne({ idPersona: persona._id }).populate('idPersona casos contratos');

    if (!detective) {
        throw new Error('Detective no encontrado');
    }

    return detective;
}

// Función para actualizar un detective por ID
async function actualizarDetective(id, body) {
    const detective = await Detective.findByIdAndUpdate(id, body, { new: true }).populate('idPersona casos contratos');

    if (!detective) {
        throw new Error('Detective no encontrado');
    }
    return detective;
}

// Función para eliminar un detective por ID
async function eliminarDetective(id) {
    const detective = await Detective.findByIdAndDelete(id);

    if (!detective) {
        throw new Error('Detective no encontrado');
    }
    return { message: 'Detective eliminado' };
}

module.exports = {
    crearDetective,
    obtenerDetectives,
    obtenerDetectivePorEmail,
    actualizarDetective,
    eliminarDetective,
};
