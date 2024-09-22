const detectiveLogic = require('../logic/detectiveLogic');
const { detectiveSchemaValidation } = require('../validations/detectiveValidations');

// Controlador para listar todos los detectives
const listarDetectives = async (req, res) => {
  try {
    const detectives = await detectiveLogic.obtenerDetectives();
    if (detectives.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(detectives);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo detective
const crearDetective = async (req, res) => {
  const body = req.body;
  const { error, value } = detectiveSchemaValidation.validate({
    idPersona: body.idPersona,
    // Otras propiedades del detective que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoDetective = await detectiveLogic.crearDetective(value);
    res.status(201).json(nuevoDetective);
  } catch (err) {
    if (err.message === 'Ya existe un detective asociado a la persona especificada.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un detective por email
const obtenerDetectivePorEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const detective = await detectiveLogic.obtenerDetectivePorEmail(email);
    res.json(detective);
  } catch (err) {
    if (err.message === 'No se encontró ninguna persona con el email especificado') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Detective no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un detective por ID
const actualizarDetective = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = detectiveSchemaValidation.validate({
    idPersona: body.idPersona,
    // Otras propiedades del detective que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const detectiveActualizado = await detectiveLogic.actualizarDetective(id, value);
    res.json(detectiveActualizado);
  } catch (err) {
    if (err.message === 'Detective no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un detective por ID
const eliminarDetective = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await detectiveLogic.eliminarDetective(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Detective no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarDetectives,
  crearDetective,
  obtenerDetectivePorEmail,
  actualizarDetective,
  eliminarDetective,
};
