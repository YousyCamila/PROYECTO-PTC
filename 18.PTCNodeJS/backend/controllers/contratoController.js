const contratoLogic = require('../logic/contratoLogic');
const { contratoSchemaValidation } = require('../validations/contratoValidations');

// Controlador para listar todos los contratos
const listarContratos = async (req, res) => {
  try {
    const contratos = await contratoLogic.obtenerContratos();
    if (contratos.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(contratos);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo contrato
const crearContrato = async (req, res) => {
  const body = req.body;
  const { error, value } = contratoSchemaValidation.validate({
    idCliente: body.idCliente,
    idDetective: body.idDetective,
    // Otras propiedades del contrato que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoContrato = await contratoLogic.crearContrato(value);
    res.status(201).json(nuevoContrato);
  } catch (err) {
    if (err.message === 'Ya existe un contrato activo para el cliente y detective especificados.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un contrato por ID
const obtenerContratoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const contrato = await contratoLogic.obtenerContratoPorId(id);
    res.json(contrato);
  } catch (err) {
    if (err.message === 'Contrato no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un contrato por ID
const actualizarContrato = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = contratoSchemaValidation.validate({
    idCliente: body.idCliente,
    idDetective: body.idDetective,
    // Otras propiedades del contrato que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const contratoActualizado = await contratoLogic.actualizarContrato(id, value);
    res.json(contratoActualizado);
  } catch (err) {
    if (err.message === 'Contrato no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un contrato por ID
const eliminarContrato = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await contratoLogic.eliminarContrato(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Contrato no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarContratos,
  crearContrato,
  obtenerContratoPorId,
  actualizarContrato,
  eliminarContrato,
};

