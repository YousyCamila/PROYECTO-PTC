const Administrador = require('../models/administradorModel');
const Persona = require('../models/personaModel');
const { personaSchemaValidation } = require('../validations/personaValidations');

async function crearAdministrador(body) {
    const { usuarioId, especialidad, dni, nombres, apellidos, correo, fechaNacimiento } = body;

    const personaData = { dni, nombres, apellidos, correo, fechaNacimiento };

    // Validar los datos de la persona
    const { error: personaError } = personaSchemaValidation.validate(personaData);
    if (personaError) {
        throw new Error(personaError.details[0].message);
    }

    // Verificar si ya existe una persona con el mismo DNI
    const personaExistente = await Persona.findOne({ dni });
    if (personaExistente) {
        throw new Error('Ya existe una persona con ese DNI.');
    }

    // Crear y guardar la nueva persona
    const nuevaPersona = new Persona(personaData);
    await nuevaPersona.save();

    // Crear el nuevo administrador y asociar la persona
    const nuevoAdministrador = new Administrador({
        usuarioId,
        especialidad,
        // Aquí debes incluir la referencia a la persona
        personaId: nuevaPersona._id // Asegúrate de que el modelo de Administrador tenga un campo para esto
    });
    await nuevoAdministrador.save();

    return nuevoAdministrador;
}


// Función para obtener todas las administradores
async function obtenerAdministradores() {
    return await Administrador.find().populate('usuarioId');
}

// Función para obtener un administrador por email
async function obtenerAdministradorPorEmail(email) {
    const administrador = await Administrador.findOne({ 'usuarioId.email': email }).populate('usuarioId');
    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }
    return administrador;
}

// Función para actualizar un administrador por email
async function actualizarAdministrador(email, body) {
    const administrador = await Administrador.findOneAndUpdate(
        { 'usuarioId.email': email },
        body,
        { new: true }
    ).populate('usuarioId');

    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }
    return administrador;
}

// Función para desactivar un administrador por email
async function desactivarAdministrador(email) {
    const administrador = await Administrador.findOneAndUpdate(
        { 'usuarioId.email': email },
        { activo: false },
        { new: true }
    );

    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }

    return { message: 'Administrador desactivado', administrador };
}

module.exports = {
    crearAdministrador,
    obtenerAdministradores,
    obtenerAdministradorPorEmail,
    actualizarAdministrador,
    desactivarAdministrador,
};
