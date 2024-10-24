const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel'); 

// Registro de usuario
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Verificar si el nombre de usuario ya existe
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role, // rol especificado
    });

    await newUser.save();

    // Generar el token JWT
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};


// Login de usuario
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Buscar al usuario por email y rol
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ error: 'Usuario, rol o contraseña incorrectos' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Usuario, rol o contraseña incorrectos' });
    }

    // Generar el token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


module.exports = { register, login };
