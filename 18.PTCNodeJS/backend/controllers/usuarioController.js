const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel');
const dotenv = require('dotenv');
dotenv.config();

// Generar Access Token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Generar Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Registro de usuario
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
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

    // Generar tokens con email incluido
    const accessToken = generateAccessToken({ id: newUser._id, role: newUser.role, email: newUser.email });
    const refreshToken = generateRefreshToken({ id: newUser._id, role: newUser.role, email: newUser.email });

    // Guardar el refresh token en una cookie httpOnly
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({ accessToken, message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login de usuario
const login = async (req, res) => {
  const { email, password, role } = req.body; // Recibir también el role

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar que el rol proporcionado coincida con el rol en la base de datos
    if (user.role !== role) {
      return res.status(403).json({ error: 'Rol incorrecto' });
    }

    // Generar tokens con email incluido
    const accessToken = generateAccessToken({ id: user._id, role: user.role, email: user.email });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role, email: user.email });

    // Guardar el refresh token en una cookie httpOnly
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      accessToken,
      message: 'Inicio de sesión exitoso',
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Endpoint para renovar el Access Token usando el Refresh Token
const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ id: user.id, role: user.role, email: user.email });
    res.json({ accessToken: newAccessToken });
  });
};

// Cerrar sesión y eliminar el Refresh Token
const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

module.exports = { register, login, refreshToken, logout };
