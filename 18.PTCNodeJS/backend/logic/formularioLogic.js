const Formulario = require('../models/formularioModel');

// Función para crear un nuevo formulario
async function crearFormulario(body) {
  const formularioExistente = await Formulario.findOne({ 
    fechaEnvio: body.fechaEnvio, 
    idCliente: body.idCliente 
  });

  if (formularioExistente) {
    throw new Error('Ya existe un formulario enviado por el cliente en la fecha especificada.');
  }

  const formulario = new Formulario(body);
  return await formulario.save();
}

// Función para obtener todos los formularios
async function obtenerFormularios() {
  return await Formulario.find().populate('idCliente');
}

// Función para obtener un formulario por ID
async function obtenerFormularioPorId(id) {
  const formulario = await Formulario.findById(id).populate('idCliente');

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return formulario;
}

// Función para actualizar un formulario por ID
async function actualizarFormulario(id, body) {
  const formulario = await Formulario.findByIdAndUpdate(id, body, { new: true }).populate('idCliente');

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return formulario;
}

// Función para eliminar un formulario por ID
async function eliminarFormulario(id) {
  const formulario = await Formulario.findByIdAndDelete(id);

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return { message: 'Formulario eliminado' };
}

module.exports = {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
};
