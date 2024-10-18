const Formulario = require('../models/formularioModel');
const nodemailer = require('nodemailer');

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

// Función para responder a un formulario
async function responderFormulario(id, respuesta) {
  const formulario = await Formulario.findByIdAndUpdate(id, { respuesta }, { new: true });

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }

  // Configuración de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Tu correo
      pass: process.env.EMAIL_PASS, // Tu contraseña de correo
    },
  });

  // Envío del correo al cliente
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: formulario.correoCliente,
    subject: 'Respuesta a su formulario',
    text: `Hola ${formulario.nombre},\n\nAquí está la respuesta a su consulta:\n${respuesta}\n\nGracias.`,
  };

  await transporter.sendMail(mailOptions);

  return formulario;
}

// Funciones para obtener, actualizar y eliminar formularios
async function obtenerFormularios() {
  return await Formulario.find().populate('idCliente');
}

async function obtenerFormularioPorId(id) {
  const formulario = await Formulario.findById(id).populate('idCliente');
  
  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return formulario;
}

async function actualizarFormulario(id, body) {
  const formulario = await Formulario.findByIdAndUpdate(id, body, { new: true }).populate('idCliente');

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return formulario;
}

async function eliminarFormulario(id) {
  const formulario = await Formulario.findByIdAndDelete(id);

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return { message: 'Formulario eliminado' };
}

module.exports = {
  crearFormulario,
  responderFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
};
