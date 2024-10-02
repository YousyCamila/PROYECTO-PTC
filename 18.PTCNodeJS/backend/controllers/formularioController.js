const formularioLogic = require('../logic/formularioLogic');
const { formularioSchemaValidation } = require('../validations/formularioValidations');

// Controlador para listar todos los formularios
const listarFormularios = async (req, res) => {
  try {
    const formularios = await formularioLogic.obtenerFormularios();
    if (formularios.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(formularios);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo formulario
const crearFormulario = async (req, res) => {
  const body = req.body;
  const { error, value } = formularioSchemaValidation.validate({
    fechaEnvio: body.fechaEnvio,
    idCliente: body.idCliente,
    // Otras propiedades del formulario que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoFormulario = await formularioLogic.crearFormulario(value);
    res.status(201).json(nuevoFormulario);
  } catch (err) {
    if (err.message === 'Ya existe un formulario enviado por el cliente en la fecha especificada.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un formulario por ID
const obtenerFormularioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const formulario = await formularioLogic.obtenerFormularioPorId(id);
    res.json(formulario);
  } catch (err) {
    if (err.message === 'Formulario no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un formulario por ID
const actualizarFormulario = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = formularioSchemaValidation.validate({
    fechaEnvio: body.fechaEnvio,
    idCliente: body.idCliente,
    // Otras propiedades del formulario que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const formularioActualizado = await formularioLogic.actualizarFormulario(id, value);
    res.json(formularioActualizado);
  } catch (err) {
    if (err.message === 'Formulario no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un formulario por ID
const eliminarFormulario = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await formularioLogic.eliminarFormulario(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Formulario no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarFormularios,
  crearFormulario,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
};
