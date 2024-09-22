const express = require('express');
const router = express.Router();
const registroCasoController = require('../controller/registroCasoController');

// Crear un nuevo registro de caso
/**
 * @swagger
 * /registros-casos:
 *   post:
 *     summary: Crear un nuevo registro de caso
 *     tags: ["Registros Casos"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Descripción del caso"
 *               idCasos:
 *                 type: string
 *                 example: "651edc5565bfc2a7f8e98345"
 *     responses:
 *       201:
 *         description: Registro de caso creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', registroCasoController.crearRegistroCaso);

// Obtener todos los registros de caso
/**
 * @swagger
 * /registros-casos:
 *   get:
 *     summary: Listar todos los registros de caso
 *     tags: ["Registros Casos"]
 *     responses:
 *       200:
 *         description: Lista de registros de caso
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
 *                     example: "Descripción del caso"
 */
router.get('/', registroCasoController.obtenerRegistrosCasos);

// Obtener un registro de caso por ID
/**
 * @swagger
 * /registros-casos/{id}:
 *   get:
 *     summary: Obtener un registro de caso por ID
 *     tags: ["Registros Casos"]
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
 * /registros-casos/{id}:
 *   put:
 *     summary: Actualizar un registro de caso por ID
 *     tags: ["Registros Casos"]
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
 *               idCasos:
 *                 type: string
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
 * /registros-casos/{id}:
 *   delete:
 *     summary: Eliminar un registro de caso por ID
 *     tags: ["Registros Casos"]
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
