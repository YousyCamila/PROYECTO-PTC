const Caso = require('../models/casoModel');

// Función para crear un nuevo caso
async function crearCaso(body) {
    const caso = new Caso(body);
    return await caso.save();
}

// Función para obtener todos los casos
async function obtenerCasos() {
    return await Caso.find().populate('idCliente idDetective evidencias registroCasos');
}

// Función para obtener un caso por ID
async function obtenerCasoPorId(id) {
    const caso = await Caso.findById(id).populate('idCliente idDetective evidencias registroCasos');

    if (!caso) {
        throw new Error('Caso no encontrado');
    }
    return caso;
}

// Función para actualizar un caso por ID
async function actualizarCaso(id, body) {
    const caso = await Caso.findByIdAndUpdate(id, body, { new: true }).populate('idCliente idDetective evidencias registroCasos');

    if (!caso) {
        throw new Error('Caso no encontrado');
    }
    return caso;
}

// Función para eliminar un caso por ID
async function eliminarCaso(id) {
    const caso = await Caso.findByIdAndDelete(id);

    if (!caso) {
        throw new Error('Caso no encontrado');
    }
    return { message: 'Caso eliminado' };
}

module.exports = {
    crearCaso,
    obtenerCasos,
    obtenerCasoPorId,
    actualizarCaso,
    eliminarCaso,
};
