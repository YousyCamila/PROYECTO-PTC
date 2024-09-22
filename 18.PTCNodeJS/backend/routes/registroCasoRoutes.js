const express = require('express');
const router = express.Router();
const registroCasoController = require('../controller/registroCasoController');

// Crear un nuevo registro de caso
/**
 * @swagger
 * /registros:
 *   post:
 *     summary: Crear un nuevo registro de caso
 *     tags: ["Registros de Caso"]
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
 *                 example: "Nuevo registro de avance en el caso"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *     responses:
 *       201:
 *         description: Registro de caso creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', registroCasoController.crearRegistroCaso);

// Obtener todos los registros de casos
/**
 * @swagger
 * /registros:
 *   get:
 *     summary: Listar todos los registros de casos
 *     tags: ["Registros de Caso"]
 *     responses:
 *       200:
 *         description: Lista de registros de casos
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
 *                     example: "Nuevo registro de avance en el caso"
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 */
router.get('/', registroCasoController.obtenerRegistrosCasos);

// Obtener un registro de caso por ID
/**
 * @swagger
 * /registros/{id}:
 *   get:
 *     summary: Obtener un registro de caso por ID
 *     tags: ["Registros de Caso"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de caso.
 *     responses:
 *       200:
 *         description: Registro de caso encontrado
 *       404:
 *         description: Registro de caso no encontrado
 */
router.get('/:id', registroCasoController.obtenerRegistroCasoPorId);

// Actualizar un registro de caso por ID
/**
 * @swagger
 * /registros/{id}:
 *   put:
 *     summary: Actualizar un registro de caso por ID
 *     tags: ["Registros de Caso"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de caso.
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
 *         description: Registro de caso actualizado exitosamente
 *       404:
 *         description: Registro de caso no encontrado
 */
router.put('/:id', registroCasoController.actualizarRegistroCaso);

// Eliminar un registro de caso por ID
/**
 * @swagger
 * /registros/{id}:
 *   delete:
 *     summary: Eliminar un registro de caso por ID
 *     tags: ["Registros de Caso"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del registro de caso.
 *     responses:
 *       200:
 *         description: Registro de caso eliminado exitosamente
 *       404:
 *         description: Registro de caso no encontrado
 */
router.delete('/:id', registroCasoController.eliminarRegistroCaso);

module.exports = router;
