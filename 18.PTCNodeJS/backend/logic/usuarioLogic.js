const Usuario = require('../models/usuarioModel'); // Ajusta la ruta según tu estructura de archivos

// Registro de usuario
async function registrarUsuario(req, res) {
  try {
    const { username, email, telefono, password, rolId } = req.body;
    const nuevoUsuario = new Usuario({ username, email, telefono, password, rolId });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Autenticación de usuario
async function autenticarUsuario(req, res) {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario || !(await usuario.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = usuario.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registrarUsuario,
  autenticarUsuario,
};
