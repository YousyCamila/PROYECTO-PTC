// services/clienteService.js
const Cliente = require('../models/clienteModel');
const Caso = require('../models/casoModel'); // Modelo de Caso

async function crearCliente(datos) {
  // Verificar si el correo ya existe
  const clienteExistenteCorreo = await Cliente.findOne({ correo: datos.correo });
  if (clienteExistenteCorreo) {
    throw new Error(`El correo ${datos.correo} ya está registrado.`);
  }

  // Verificar si el número de documento ya existe
  const clienteExistenteDocumento = await Cliente.findOne({ numeroDocumento: datos.numeroDocumento });
  if (clienteExistenteDocumento) {
    throw new Error(`El número de documento ${datos.numeroDocumento} ya está registrado.`);
  }

  // Crear el cliente
  const cliente = new Cliente(datos);
  return await cliente.save();
}

async function listarClientes() {
  const clientes = await Cliente.find({ activo: true });
  if (clientes.length === 0) {
    throw new Error('No hay clientes registrados actualmente.');
  }
  return clientes;
}

async function buscarClientePorId(id) {
  const cliente = await Cliente.findById(id);
  if (!cliente) {
    throw new Error('Cliente no encontrado.');
  }
  return cliente;
}


async function buscarClientePorCorreo(correo) {
  const cliente = await Cliente.findOne({ correo, activo: true });
  if (!cliente) {
    throw new Error(`No se encontró un cliente con el correo: ${correo}`);
  }
  return cliente;
}

async function actualizarCliente(id, datos) {
  const cliente = await Cliente.findById(id);

  if (!cliente || !cliente.activo) {
    throw new Error('El cliente que intenta actualizar no existe o ha sido desactivado.');
  }

  // Verificar si el correo ya está en uso por otro cliente
  if (datos.correo && datos.correo !== cliente.correo) {
    const correoExistente = await Cliente.findOne({ correo: datos.correo });
    if (correoExistente) {
      throw new Error(`El correo ${datos.correo} ya está en uso por otro cliente.`);
    }
  }

  // Verificar si el número de documento ya está en uso por otro cliente
  if (datos.numeroDocumento && datos.numeroDocumento !== cliente.numeroDocumento) {
    const documentoExistente = await Cliente.findOne({ numeroDocumento: datos.numeroDocumento });
    if (documentoExistente) {
      throw new Error(`El número de documento ${datos.numeroDocumento} ya está en uso por otro cliente.`);
    }
  }

  Object.assign(cliente, datos); // Actualizar los datos del cliente
  return await cliente.save();
}

async function desactivarCliente(id) {
  const cliente = await Cliente.findById(id); // Encuentra el cliente por ID
  if (!cliente) {
    throw new Error('El cliente que intenta desactivar no existe.'); // Error si no se encuentra
  }
  
  cliente.activo = false; // Cambia el estado a inactivo
  return await cliente.save(); // Guarda el cliente con el nuevo estado
}



module.exports = {
  crearCliente,
  listarClientes,
  buscarClientePorCorreo,
  actualizarCliente,
  desactivarCliente,
  buscarClientePorId,
};
