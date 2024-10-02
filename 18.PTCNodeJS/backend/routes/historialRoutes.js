const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

// Crear un nuevo historial
/**
 * @swagger
 * /historials:
 *   post:
 *     summary: Crear un nuevo historial
 *     tags: ["Historiales"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               casoId:
 *                 type: string
 *                 example: "651edc5565bfc2a7f8e98345"
 *               descripcion:
 *                 type: string
 *                 example: "Reunión con el cliente"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *     responses:
 *       201:
 *         description: Historial creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', historialController.crearHistorial);

// Obtener todos los historiales
/**
 * @swagger
 * /historials:
 *   get:
 *     summary: Listar todos los historiales
 *     tags: ["Historiales"]
 *     responses:
 *       200:
 *         description: Lista de historiales
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
 *                   casoId:
 *                     type: string
 *                     example: "651edc5565bfc2a7f8e98345"
 *                   descripcion:
 *                     type: string
 *                     example: "Reunión con el cliente"
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 */
router.get('/', historialController.listarHistoriales);

// Obtener un historial por ID
/**
 * @swagger
 * /historials/{id}:
 *   get:
 *     summary: Obtener un historial por ID
 *     tags: ["Historiales"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del historial.
 *     responses:
 *       200:
 *         description: Historial encontrado
 *       404:
 *         description: Historial no encontrado
 */
router.get('/:id', historialController.obtenerHistorialPorId);

// Actualizar un historial por ID
/**
 * @swagger
 * /historials/{id}:
 *   put:
 *     summary: Actualizar un historial por ID
 *     tags: ["Historiales"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del historial.
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
 *         description: Historial actualizado exitosamente
 *       404:
 *         description: Historial no encontrado
 */
router.put('/:id', historialController.actualizarHistorial);

// Eliminar un historial por ID
/**
 * @swagger
 * /historials/{id}:
 *   delete:
 *     summary: Eliminar un historial por ID
 *     tags: ["Historiales"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del historial.
 *     responses:
 *       200:
 *         description: Historial eliminado exitosamente
 *       404:
 *         description: Historial no encontrado
 */
router.delete('/:id', historialController.eliminarHistorial);

module.exports = router;
