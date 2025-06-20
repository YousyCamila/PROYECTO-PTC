const express = require('express');
const router = express.Router();
const tipoEvidenciaController = require('../controllers/tipoEvidenciaController');

// Crear un nuevo tipo de evidencia
/**
 * @swagger
 * /tipos-evidencia:
 *   post:
 *     summary: Crear un nuevo tipo de evidencia
 *     tags: ["Tipos de Evidencia"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Fotografía"
 *     responses:
 *       201:
 *         description: Tipo de evidencia creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', tipoEvidenciaController.crearTipoEvidencia);

// Obtener todos los tipos de evidencia
/**
 * @swagger
 * /tipos-evidencia:
 *   get:
 *     summary: Listar todos los tipos de evidencia
 *     tags: ["Tipos de Evidencia"]
 *     responses:
 *       200:
 *         description: Lista de tipos de evidencia
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
 *                   nombre:
 *                     type: string
 *                     example: "Fotografía"
 */
router.get('/', tipoEvidenciaController.obtenerTiposEvidencia);

// Obtener un tipo de evidencia por ID
/**
 * @swagger
 * /tipos-evidencia/{id}:
 *   get:
 *     summary: Obtener un tipo de evidencia por ID
 *     tags: ["Tipos de Evidencia"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del tipo de evidencia.
 *     responses:
 *       200:
 *         description: Tipo de evidencia encontrado
 *       404:
 *         description: Tipo de evidencia no encontrado
 */
router.get('/:id', tipoEvidenciaController.obtenerTipoEvidenciaPorId);

// Actualizar un tipo de evidencia por ID
/**
 * @swagger
 * /tipos-evidencia/{id}:
 *   put:
 *     summary: Actualizar un tipo de evidencia por ID
 *     tags: ["Tipos de Evidencia"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del tipo de evidencia.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de evidencia actualizado exitosamente
 *       404:
 *         description: Tipo de evidencia no encontrado
 */
router.put('/:id', tipoEvidenciaController.actualizarTipoEvidencia);

// Eliminar un tipo de evidencia por ID
/**
 * @swagger
 * /tipos-evidencia/{id}:
 *   delete:
 *     summary: Eliminar un tipo de evidencia por ID
 *     tags: ["Tipos de Evidencia"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del tipo de evidencia.
 *     responses:
 *       200:
 *         description: Tipo de evidencia eliminado exitosamente
 *       404:
 *         description: Tipo de evidencia no encontrado
 */
router.delete('/:id', tipoEvidenciaController.eliminarTipoEvidencia);

module.exports = router;
