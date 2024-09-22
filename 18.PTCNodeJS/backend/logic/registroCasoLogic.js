const RegistroCaso = require('../models/registroCasoModel');
const Caso = require('../models/casoModel'); // Asegúrate de importar el modelo de Caso si es necesario

// Función para crear un nuevo registro de caso
async function crearRegistroCaso(body) {
    const registroCaso = new RegistroCaso(body);
    return await registroCaso.save();
}

// Función para obtener todos los registros de caso
async function obtenerRegistrosCasos() {
    return await RegistroCaso.find().populate('idCasos');
}

// Función para obtener un registro de caso por ID
async function obtenerRegistroCasoPorId(id) {
    const registroCaso = await RegistroCaso.findById(id).populate('idCasos');

    if (!registroCaso) {
        throw new Error('Registro de caso no encontrado');
    }
    return registroCaso;
}

// Función para actualizar un registro de caso por ID
async function actualizarRegistroCaso(id, body) {
    const registroCaso = await RegistroCaso.findByIdAndUpdate(id, body, { new: true }).populate('idCasos');

    if (!registroCaso) {
        throw new Error('Registro de caso no encontrado');
    }
    return registroCaso;
}

// Función para eliminar un registro de caso por ID
async function eliminarRegistroCaso(id) {
    const registroCaso = await RegistroCaso.findByIdAndDelete(id);

    if (!registroCaso) {
        throw new Error('Registro de caso no encontrado');
    }
    return { message: 'Registro de caso eliminado' };
}

module.exports = {
    crearRegistroCaso,
    obtenerRegistrosCasos,
    obtenerRegistroCasoPorId,
    actualizarRegistroCaso,
    eliminarRegistroCaso,
};
