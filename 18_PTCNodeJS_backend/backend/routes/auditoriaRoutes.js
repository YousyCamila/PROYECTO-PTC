const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoriaController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');

// Crear un nuevo registro de auditoría
/**
 * @swagger
 * /auditorias:
 *   post:
 *     summary: Crear un nuevo registro de auditoría
 *     tags: ["Auditorías"]
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accion:
 *                 type: string
 *                 example: "Crear un nuevo administrador"
 *               usuario:
 *                 type: string
 *                 example: "admin@example.com"
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-22T14:00:00Z"
 *     responses:
 *       201:
 *         description: Registro de auditoría creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', authenticateToken, authorizeRole(['administrador']), auditoriaController.crearAuditoria);

// Obtener todos los registros de auditoría
/**
 * @swagger
 * /auditorias:
 *   get:
 *     summary: Listar todos los registros de auditoría
 *     tags: ["Auditorías"]
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "651edc5565bfc2a7f8e98345"
 *                   accion:
 *                     type: string
 *                     example: "Crear un nuevo administrador"
 *                   usuario:
 *                     type: string
 *                     example: "admin@example.com"
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-22T14:00:00Z"
 */
router.get('/', authenticateToken, authorizeRole(['administrador']), auditoriaController.listarAuditorias);

// Obtener un registro de auditoría por ID
/**
 * @swagger
 * /auditorias/{id}:
 *   get:
 *     summary: Obtener un registro de auditoría por ID
 *     tags: ["Auditorías"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de auditoría.
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Registro de auditoría encontrado
 *       404:
 *         description: Registro de auditoría no encontrado
 */
router.get('/:id', authenticateToken, authorizeRole(['administrador']), auditoriaController.obtenerAuditoriaPorId);

// Actualizar un registro de auditoría por ID
/**
 * @swagger
 * /auditorias/{id}:
 *   put:
 *     summary: Actualizar un registro de auditoría por ID
 *     tags: ["Auditorías"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de auditoría.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accion:
 *                 type: string
 *               usuario:
 *                 type: string
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Registro de auditoría actualizado exitosamente
 *       404:
 *         description: Registro de auditoría no encontrado
 */
router.put('/:id', authenticateToken, authorizeRole(['administrador']), auditoriaController.actualizarAuditoria);

// Eliminar un registro de auditoría por ID
/**
 * @swagger
 * /auditorias/{id}:
 *   delete:
 *     summary: Eliminar un registro de auditoría por ID
 *     tags: ["Auditorías"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de auditoría.
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Registro de auditoría eliminado exitosamente
 *       404:
 *         description: Registro de auditoría no encontrado
 */
router.delete('/:id', authenticateToken, authorizeRole(['administrador']), auditoriaController.eliminarAuditoria);

module.exports = router;
