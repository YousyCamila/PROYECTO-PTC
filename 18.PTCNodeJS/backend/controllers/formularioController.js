const formularioService = require('../logic/formularioLogic');
const { formularioSchemaValidation } = require('../validations/formularioValidation');
const nodemailer = require('nodemailer');

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Crear un nuevo formulario
const crearFormulario = async (req, res) => {
  try {
    // Validar los datos del formulario
    await formularioSchemaValidation.validateAsync(req.body);

    const formulario = await formularioService.crearFormulario(req.body);
    
    // Envío de correo electrónico al administrador
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Nuevo formulario enviado',
      text: `Se ha enviado un nuevo formulario:\n\nNombre: ${formulario.nombre}\nDescripción: ${formulario.descripcion}\nCorreo: ${formulario.correo}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(formulario);
  } catch (error) {
    res.status(400).json({ message: 'Error de validación', error: error.message });
  }
};

// Responder a un formulario
const responderFormulario = async (req, res) => {
  const { id } = req.params;
  const { respuesta } = req.body;

  try {
    const formulario = await formularioService.obtenerFormularioPorId(id);

    if (!formulario) {
      return res.status(404).json({ message: 'Formulario no encontrado' });
    }

    // Envío del correo electrónico al cliente
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: formulario.correo,
      subject: 'Respuesta a tu solicitud',
      text: respuesta
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Respuesta enviada al cliente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar respuesta', error: error.message });
  }
};

// Exportar los controladores
module.exports = {
  crearFormulario,
  responderFormulario,
};
