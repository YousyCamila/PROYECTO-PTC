// usuarioRoutes.js
const express = require('express');
const { register, login, refreshToken, logout } = require('../controllers/usuarioController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const handleRefreshToken = require('../middleware/handleRefreshToken');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro, inicio de sesión y autenticación
 */

/**
 * @swagger
 * /usuario/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevoUsuario"
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *               role:
 *                 type: string
 *                 example: "cliente"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: El usuario o correo ya existen
 *       500:
 *         description: Error en el servidor
 */
router.post('/register', register);

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR...token"
 *                 role:
 *                   type: string
 *                   example: "cliente"
 *                 userId:
 *                   type: string
 *                   example: "60c72b2f9b1d4c3a2c4f9a3e"
 *       400:
 *         description: Usuario o contraseña incorrectos
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', login);

/**
 * @swagger
 * /usuario/token:
 *   post:
 *     summary: Renovar el Access Token usando el Refresh Token
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Nuevo Access Token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR...nuevoToken"
 *       403:
 *         description: No autorizado
 */
router.post('/token', handleRefreshToken);

/**
 * @swagger
 * /usuario/logout:
 *   post:
 *     summary: Cerrar sesión de un usuario
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 */
router.post('/logout', logout);

/**
 * @swagger
 * /usuario/admin:
 *   get:
 *     summary: Acceso de administrador a una ruta protegida
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido para administrador
 *       403:
 *         description: Acceso denegado. Rol insuficiente
 *       401:
 *         description: No autenticado
 */
router.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Acceso permitido para administrador' });
});

module.exports = router;
