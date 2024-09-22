const casoLogic = require('../logic/casoLogic');
const { casoSchemaValidation } = require('../validations/casoValidations');

// Controlador para listar todos los casos
const listarCasos = async (req, res) => {
  try {
    const casos = await casoLogic.obtenerCasos();
    if (casos.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(casos);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo caso
const crearCaso = async (req, res) => {
  const body = req.body;
  const { error, value } = casoSchemaValidation.validate({
    // Agrega las propiedades que necesites validar
    idCliente: body.idCliente,
    idDetective: body.idDetective,
    evidencias: body.evidencias,
    // Otras propiedades del caso
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoCaso = await casoLogic.crearCaso(value);
    res.status(201).json(nuevoCaso);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un caso por ID
const obtenerCasoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const caso = await casoLogic.obtenerCasoPorId(id);
    res.json(caso);
  } catch (err) {
    if (err.message === 'Caso no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un caso por ID
const actualizarCaso = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = casoSchemaValidation.validate({
    // Agrega las propiedades que necesites validar
    idCliente: body.idCliente,
    idDetective: body.idDetective,
    evidencias: body.evidencias,
    // Otras propiedades del caso
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const casoActualizado = await casoLogic.actualizarCaso(id, value);
    res.json(casoActualizado);
  } catch (err) {
    if (err.message === 'Caso no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un caso por ID
const eliminarCaso = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await casoLogic.eliminarCaso(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Caso no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarCasos,
  crearCaso,
  obtenerCasoPorId,
  actualizarCaso,
  eliminarCaso,
};

