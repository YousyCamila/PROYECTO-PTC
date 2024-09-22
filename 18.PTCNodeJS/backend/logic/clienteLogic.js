const Cliente = require('../models/clienteModel');
const Persona = require('../models/personaModel'); // Asegúrate de importar el modelo de Persona

// Función para crear un nuevo cliente
async function crearCliente(body) {
    const clienteExistente = await Cliente.findOne({ idPersona: body.idPersona });

    if (clienteExistente) {
        throw new Error('Ya existe un cliente asociado a la persona especificada.');
    }

    const cliente = new Cliente(body);
    return await cliente.save();
}

// Función para obtener todos los clientes
async function obtenerClientes() {
    return await Cliente.find().populate('idPersona casos contratos facturas formularios historials');
}

// Función para obtener un cliente por email de la persona asociada
async function obtenerClientePorEmail(email) {
    // Buscar la persona por email
    const persona = await Persona.findOne({ email });

    if (!persona) {
        throw new Error('No se encontró ninguna persona con el email especificado');
    }

    // Buscar el cliente utilizando el `idPersona`
    const cliente = await Cliente.findOne({ idPersona: persona._id }).populate('idPersona casos contratos facturas formularios historials');

    if (!cliente) {
        throw new Error('Cliente no encontrado');
    }

    return cliente;
}

// Función para actualizar un cliente por ID
async function actualizarCliente(id, body) {
    const cliente = await Cliente.findByIdAndUpdate(id, body, { new: true }).populate('idPersona casos contratos facturas formularios historials');

    if (!cliente) {
        throw new Error('Cliente no encontrado');
    }
    return cliente;
}

// Función para eliminar un cliente por ID
async function eliminarCliente(id) {
    const cliente = await Cliente.findByIdAndDelete(id);

    if (!cliente) {
        throw new Error('Cliente no encontrado');
    }
    return { message: 'Cliente eliminado' };
}

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientePorEmail,
    actualizarCliente,
    eliminarCliente,
};
