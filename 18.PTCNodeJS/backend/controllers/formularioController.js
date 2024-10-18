const formularioService = require('../logic/formularioLogic');
const { formularioSchemaValidation } = require('../validations/formularioValidations');

// Controlador para crear un nuevo formulario
const crearFormulario = async (req, res) => {
  try {
    await formularioSchemaValidation.validateAsync(req.body);
    const formulario = await formularioService.crearFormulario(req.body);
    res.status(201).json(formulario);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el formulario', error: error.message });
  }
};

// Controlador para responder a un formulario
const responderFormulario = async (req, res) => {
  try {
    const { respuesta } = req.body;
    const formulario = await formularioService.responderFormulario(req.params.id, respuesta);
    res.status(200).json(formulario);
  } catch (error) {
    res.status(500).json({ message: 'Error al responder el formulario', error: error.message });
  }
};

// Otras funciones del controlador...
const obtenerFormularios = async (req, res) => {
  try {
    const formularios = await formularioService.obtenerFormularios();
    res.status(200).json(formularios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener formularios', error: error.message });
  }
};

const obtenerFormularioPorId = async (req, res) => {
  try {
    const formulario = await formularioService.obtenerFormularioPorId(req.params.id);
    res.status(200).json(formulario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el formulario', error: error.message });
  }
};

const actualizarFormulario = async (req, res) => {
  try {
    const formularioActualizado = await formularioService.actualizarFormulario(req.params.id, req.body);
    res.status(200).json(formularioActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el formulario', error: error.message });
  }
};

const eliminarFormulario = async (req, res) => {
  try {
    const resultado = await formularioService.eliminarFormulario(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el formulario', error: error.message });
  }
};

module.exports = {
  crearFormulario,
  responderFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
};
