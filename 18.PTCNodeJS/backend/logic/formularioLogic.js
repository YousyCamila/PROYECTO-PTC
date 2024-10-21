const Formulario = require('../models/formularioModel');
const nodemailer = require('nodemailer');

// Función para crear un nuevo formulario
async function crearFormulario(body) {
  // Validación opcional del cliente solo si se proporciona un idCliente
  if (body.idCliente) {
    const formularioExistente = await Formulario.findOne({
      idCliente: body.idCliente,
    });

    if (formularioExistente) {
      throw new Error('Ya existe un formulario enviado por este cliente.');
    }
  }

  try {
    const formulario = new Formulario(body);
    const formularioGuardado = await formulario.save();
    return formularioGuardado;
  } catch (error) {
    throw new Error('Error al guardar el formulario: ' + error.message);
  }
}

// Función para responder a un formulario
async function responderFormulario(id, respuesta) {
  const formulario = await Formulario.findByIdAndUpdate(
    id,
    { respuesta },
    { new: true }
  );

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }

  // Configuración de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Correo
      pass: process.env.EMAIL_PASS, // Contraseña
    },
  });

  // Envío del correo al cliente
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: formulario.correoCliente,
    subject: 'Respuesta a su formulario',
    text: `Hola ${formulario.nombre},\n\nAquí está la respuesta a su consulta:\n${respuesta}\n\nGracias.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return formulario;
  } catch (error) {
    throw new Error('Error al enviar el correo: ' + error.message);
  }
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

// Función para actualizar un formulario
async function actualizarFormulario(id, body) {
  const formulario = await Formulario.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('idCliente');

  if (!formulario) {
    throw new Error('Formulario no encontrado');
  }
  return formulario;
}

// Función para eliminar un formulario
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
