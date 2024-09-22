const express = require('express');
const router = express.Router();
const evidenciaController = require('../controllers/evidenciaController');

// Crear una nueva evidencia
/**
 * @swagger
 * /evidencias:
 *   post:
 *     summary: Crear una nueva evidencia
 *     tags: ["Evidencias"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Fotografía del lugar del crimen"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *               archivo:
 *                 type: string
 *                 example: "ruta/a/la/evidencia.jpg"
 *     responses:
 *       201:
 *         description: Evidencia creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', evidenciaController.crearEvidencia);

// Obtener todas las evidencias
/**
 * @swagger
 * /evidencias:
 *   get:
 *     summary: Listar todas las evidencias
 *     tags: ["Evidencias"]
 *     responses:
 *       200:
 *         description: Lista de evidencias
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
 *                     example: "Fotografía del lugar del crimen"
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 *                   archivo:
 *                     type: string
 *                     example: "ruta/a/la/evidencia.jpg"
 */
router.get('/', evidenciaController.listarEvidencias);

// Obtener una evidencia por ID
/**
 * @swagger
 * /evidencias/{id}:
 *   get:
 *     summary: Obtener una evidencia por ID
 *     tags: ["Evidencias"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la evidencia.
 *     responses:
 *       200:
 *         description: Evidencia encontrada
 *       404:
 *         description: Evidencia no encontrada
 */
router.get('/:id', evidenciaController.obtenerEvidenciaPorId);

// Actualizar una evidencia por ID
/**
 * @swagger
 * /evidencias/{id}:
 *   put:
 *     summary: Actualizar una evidencia por ID
 *     tags: ["Evidencias"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la evidencia.
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
 *               archivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evidencia actualizada exitosamente
 *       404:
 *         description: Evidencia no encontrada
 */
router.put('/:id', evidenciaController.actualizarEvidencia);

// Eliminar una evidencia por ID
/**
 * @swagger
 * /evidencias/{id}:
 *   delete:
 *     summary: Eliminar una evidencia por ID
 *     tags: ["Evidencias"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la evidencia.
 *     responses:
 *       200:
 *         description: Evidencia eliminada exitosamente
 *       404:
 *         description: Evidencia no encontrada
 */
router.delete('/:id', evidenciaController.eliminarEvidencia);

module.exports = router;
