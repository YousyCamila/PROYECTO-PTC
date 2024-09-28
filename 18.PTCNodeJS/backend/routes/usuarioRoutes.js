const express = require('express');
const { register, login } = require('../controllers/usuarioController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Registro e inicio de sesión
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
 *               role:
 *                 type: string
 *                 example: "cliente"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR...token"
 *       400:
 *         description: Usuario, rol o contraseña incorrectos
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', login);

module.exports = router;
