const express = require('express');
const router = express.Router();
const registroMantenimientoController = require('../controller/registroMantenimientoController');

// Crear un nuevo registro de mantenimiento
/**
 * @swagger
 * /registros-mantenimiento:
 *   post:
 *     summary: Crear un nuevo registro de mantenimiento
 *     tags: ["Registros de Mantenimiento"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Mantenimiento de software"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *     responses:
 *       201:
 *         description: Registro de mantenimiento creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', registroMantenimientoController.crearRegistroMantenimiento);

// Obtener todos los registros de mantenimiento
/**
 * @swagger
 * /registros-mantenimiento:
 *   get:
 *     summary: Listar todos los registros de mantenimiento
 *     tags: ["Registros de Mantenimiento"]
 *     responses:
 *       200:
 *         description: Lista de registros de mantenimiento
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
 *                   descripcion:
 *                     type: string
 *                     example: "Mantenimiento de software"
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 */
router.get('/', registroMantenimientoController.obtenerRegistrosMantenimiento);

// Obtener un registro de mantenimiento por ID
/**
 * @swagger
 * /registros-mantenimiento/{id}:
 *   get:
 *     summary: Obtener un registro de mantenimiento por ID
 *     tags: ["Registros de Mantenimiento"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de mantenimiento.
 *     responses:
 *       200:
 *         description: Registro de mantenimiento encontrado
 *       404:
 *         description: Registro de mantenimiento no encontrado
 */
router.get('/:id', registroMantenimientoController.obtenerRegistroMantenimientoPorId);

// Actualizar un registro de mantenimiento por ID
/**
 * @swagger
 * /registros-mantenimiento/{id}:
 *   put:
 *     summary: Actualizar un registro de mantenimiento por ID
 *     tags: ["Registros de Mantenimiento"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de mantenimiento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Registro de mantenimiento actualizado exitosamente
 *       404:
 *         description: Registro de mantenimiento no encontrado
 */
router.put('/:id', registroMantenimientoController.actualizarRegistroMantenimiento);

// Eliminar un registro de mantenimiento por ID
/**
 * @swagger
 * /registros-mantenimiento/{id}:
 *   delete:
 *     summary: Eliminar un registro de mantenimiento por ID
 *     tags: ["Registros de Mantenimiento"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de mantenimiento.
 *     responses:
 *       200:
 *         description: Registro de mantenimiento eliminado exitosamente
 *       404:
 *         description: Registro de mantenimiento no encontrado
 */
router.delete('/:id', registroMantenimientoController.eliminarRegistroMantenimiento);

module.exports = router;
