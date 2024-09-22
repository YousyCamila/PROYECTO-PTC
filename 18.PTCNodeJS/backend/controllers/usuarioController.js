const Usuario = require('../models/usuarioModel'); // Ajusta la ruta según tu estructura de archivos
const { usuarioSchemaValidation } = require('../validations/usuarioValidations'); // Asegúrate de tener una validación

// Registro de usuario
async function registrarUsuario(req, res) {
  const { error, value } = usuarioSchemaValidation.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { username, email, telefono, password, rolId } = value;
    const nuevoUsuario = new Usuario({ username, email, telefono, password, rolId });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Autenticación de usuario
async function autenticarUsuario(req, res) {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario || !(await usuario.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = usuario.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  registrarUsuario,
  autenticarUsuario,
};
