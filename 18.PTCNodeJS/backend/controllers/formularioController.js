const formularioLogic = require('../logic/formularioLogic');
const { formularioSchemaValidation } = require('../validations/formularioValidations');
const { enviarCorreo } = require('../services/mailService');

const handleError = (res, error, defaultMessage) => {
  const statusCode = error.message.includes('no encontrado') ? 404 : 400;
  res.status(statusCode).json({ message: defaultMessage, error: error.message });
};

const crearFormulario = async (req, res) => {
  try {
    // Validar el cuerpo de la solicitud
    await formularioSchemaValidation.validateAsync(req.body, { abortEarly: false });
    const formulario = await formularioLogic.crearFormulario(req.body);
    res.status(201).json(formulario);
  } catch (error) {
    handleError(res, error, 'Error al crear el formulario');
  }
};

const responderFormulario = async (req, res) => {
  try {
    const { respuesta } = req.body;
    const formulario = await formularioLogic.responderFormulario(req.params.id, respuesta);
    res.status(200).json(formulario);
  } catch (error) {
    console.error('Error al responder el formulario:', error.message);
    handleError(res, error, 'Error al responder el formulario');
  }
};

const obtenerFormularios = async (req, res) => {
  try {
    const formularios = await formularioLogic.obtenerFormularios();
    res.status(200).json(formularios);
  } catch (error) {
    handleError(res, error, 'Error al obtener formularios');
  }
};

// **Nuevo: Obtener solo formularios respondidos**
const obtenerFormulariosRespondidos = async (req, res) => {
  try {
    const formulariosRespondidos = await formularioLogic.obtenerFormulariosRespondidos();
    res.status(200).json(formulariosRespondidos);
  } catch (error) {
    handleError(res, error, 'Error al obtener los formularios respondidos');
  }
};


const obtenerFormularioPorId = async (req, res) => {
  try {
    const formulario = await formularioLogic.obtenerFormularioPorId(req.params.id);
    res.status(200).json(formulario);
  } catch (error) {
    handleError(res, error, 'Formulario no encontrado');
  }
};

const actualizarFormulario = async (req, res) => {
  try {
    await formularioSchemaValidation.validateAsync(req.body, { abortEarly: false });
    const formulario = await formularioLogic.actualizarFormulario(req.params.id, req.body);
    res.status(200).json(formulario);
  } catch (error) {
    handleError(res, error, 'Error al actualizar el formulario');
  }
};

const eliminarFormulario = async (req, res) => {
  try {
    const result = await formularioLogic.eliminarFormulario(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error, 'Formulario no encontrado');
  }
};

module.exports = {
  crearFormulario,
  responderFormulario,
  obtenerFormularios,
  obtenerFormulariosRespondidos, // Exportamos la nueva función
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
  
};
