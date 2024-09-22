const Administrador = require('../models/administradorModel');
const Persona = require('../models/personaModel'); // Asegúrate de importar el modelo de Persona

// Función para crear un nuevo administrador
async function crearAdministrador(body) {
    const administradorExistente = await Administrador.findOne({ idPersona: body.idPersona });

    if (administradorExistente) {
        throw new Error('Ya existe un administrador con la persona especificada.');
    }

    const administrador = new Administrador(body);
    return await administrador.save();
}

// Función para obtener todos los administradores
async function obtenerAdministradores() {
    return await Administrador.find().populate('idPersona registroMantenimientos');
}

// Función para obtener un administrador por email
async function obtenerAdministradorPorEmail(email) {
    // Busca la persona por el email
    const persona = await Persona.findOne({ email });

    if (!persona) {
        throw new Error('No se encontró ninguna persona con el email especificado');
    }

    // Busca el administrador utilizando el `idPersona`
    const administrador = await Administrador.findOne({ idPersona: persona._id }).populate('idPersona registroMantenimientos');

    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }

    return administrador;
}

// Función para actualizar un administrador por ID
async function actualizarAdministrador(id, body) {
    const administrador = await Administrador.findByIdAndUpdate(id, body, { new: true }).populate('idPersona registroMantenimientos');

    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }
    return administrador;
}

// Función para eliminar un administrador por ID
async function eliminarAdministrador(id) {
    const administrador = await Administrador.findByIdAndDelete(id);

    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }
    return { message: 'Administrador eliminado' };
}

module.exports = {
    crearAdministrador,
    obtenerAdministradores,
    obtenerAdministradorPorEmail,
    actualizarAdministrador,
    eliminarAdministrador,
};
