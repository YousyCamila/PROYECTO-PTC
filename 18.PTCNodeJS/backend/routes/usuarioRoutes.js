const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Registro de usuario
/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: ["Usuarios"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               telefono:
 *                 type: string
 *                 example: "555-1234"
 *               password:
 *                 type: string
 *                 example: "ContraseñaSegura"
 *               rolId:
 *                 type: string
 *                 example: "651edc5565bfc2a7f8e98345"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error interno del servidor
 */
router.post('/registro', usuarioController.registrarUsuario);

// Autenticación de usuario
/**
 * @swagger
 * /usuarios/autenticacion:
 *   post:
 *     summary: Autenticar un usuario
 *     tags: ["Usuarios"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "ContraseñaSegura"
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/autenticacion', usuarioController.autenticarUsuario);

module.exports = router;
