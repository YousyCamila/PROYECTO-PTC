const clienteLogic = require('../logic/clienteLogic');
const { clienteSchemaValidation } = require('../validations/clienteValidations');

// Controlador para listar todos los clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteLogic.obtenerClientes();
    if (clientes.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo cliente
const crearCliente = async (req, res) => {
  const body = req.body;
  const { error, value } = clienteSchemaValidation.validate({
    idPersona: body.idPersona,
    // Otras propiedades del cliente que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoCliente = await clienteLogic.crearCliente(value);
    res.status(201).json(nuevoCliente);
  } catch (err) {
    if (err.message === 'Ya existe un cliente asociado a la persona especificada.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un cliente por email
const obtenerClientePorEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const cliente = await clienteLogic.obtenerClientePorEmail(email);
    res.json(cliente);
  } catch (err) {
    if (err.message === 'No se encontró ninguna persona con el email especificado' || 
        err.message === 'Cliente no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un cliente por ID
const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = clienteSchemaValidation.validate({
    idPersona: body.idPersona,
    // Otras propiedades del cliente que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const clienteActualizado = await clienteLogic.actualizarCliente(id, value);
    res.json(clienteActualizado);
  } catch (err) {
    if (err.message === 'Cliente no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un cliente por ID
const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await clienteLogic.eliminarCliente(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Cliente no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarClientes,
  crearCliente,
  obtenerClientePorEmail,
  actualizarCliente,
  eliminarCliente,
};
