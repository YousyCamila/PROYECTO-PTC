const Rol = require('../models/roleModels');
const Usuario = require('../models/usuarioModels'); // Asegúrate de importar el modelo de Usuario si es necesario

// Función para crear un nuevo rol
async function crearRol(body) {
    const rol = new Rol(body);
    return await rol.save();
}

// Función para obtener todos los roles
async function obtenerRoles() {
    return await Rol.find().populate('usuarios');
}

// Función para obtener un rol por ID
async function obtenerRolPorId(id) {
    const rol = await Rol.findById(id).populate('usuarios');

    if (!rol) {
        throw new Error('Rol no encontrado');
    }
    return rol;
}

// Función para actualizar un rol por ID
async function actualizarRol(id, body) {
    const rol = await Rol.findByIdAndUpdate(id, body, { new: true }).populate('usuarios');

    if (!rol) {
        throw new Error('Rol no encontrado');
    }
    return rol;
}

// Función para eliminar un rol por ID
async function eliminarRol(id) {
    const rol = await Rol.findByIdAndDelete(id);

    if (!rol) {
        throw new Error('Rol no encontrado');
    }
    return { message: 'Rol eliminado' };
}

module.exports = {
    crearRol,
    obtenerRoles,
    obtenerRolPorId,
    actualizarRol,
    eliminarRol,
};
