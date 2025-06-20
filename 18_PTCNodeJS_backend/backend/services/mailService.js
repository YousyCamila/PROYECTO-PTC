const nodemailer = require('nodemailer');
require('dotenv').config(); // Para usar variables de entorno

// Configuración del transportador SMTP con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Tu correo Gmail
    pass: process.env.EMAIL_PASS   // Contraseña de aplicación generada
  },
});

// Función para enviar el correo
async function enviarCorreo(destinatario, asunto, mensaje) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: asunto,
    text: mensaje,
    // html: '<p>Esto es un mensaje en HTML</p>', // Descomentar si necesitas enviar HTML
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error.message); // Mensaje de error más claro
    throw new Error('No se pudo enviar el correo'); // Lanzar el error si es necesario
  }
}

module.exports = { enviarCorreo };
