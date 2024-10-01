// controllers/clienteController.js
const clienteService = require('../logic/clienteLogic');

const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await clienteService.crearCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const buscarClientePorId = async (req, res) => {
  try {
    const cliente = await clienteService.buscarClientePorId(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const buscarClientePorCorreo = async (req, res) => {
  try {
    const cliente = await clienteService.buscarClientePorCorreo(req.params.correo);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await clienteService.actualizarCliente(req.params.id, req.body);
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const desactivarCliente = async (req, res) => {
  try {
    const cliente = await clienteService.desactivarCliente(req.params.id); // Llama al servicio para desactivar el cliente
    res.status(200).json(cliente); // Envía de vuelta el cliente actualizado
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



module.exports = {
  crearCliente,
  listarClientes,
  buscarClientePorCorreo,
  actualizarCliente,
  desactivarCliente,
  buscarClientePorId,
};
