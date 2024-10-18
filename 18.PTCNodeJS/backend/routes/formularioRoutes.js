const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

// Crear un nuevo formulario
/**
 * @swagger
 * /formularios:
 *   post:
 *     summary: Crear un nuevo formulario
 *     tags: ["Formularios"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - numeroCelular
 *               - descripcion
 *               - correoCliente
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               numeroCelular:
 *                 type: string
 *                 example: "1234567890"
 *               descripcion:
 *                 type: string
 *                 example: "Necesito información sobre sus servicios."
 *               fechaEnvio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-18T12:00:00Z"
 *               idCliente:
 *                 type: string
 *                 example: "651edc5565bfc2a7f8e98345"
 *               correoCliente:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@example.com"
 *     responses:
 *       201:
 *         description: Formulario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', formularioController.crearFormulario);

// Obtener todos los formularios
/**
 * @swagger
 * /formularios:
 *   get:
 *     summary: Listar todos los formularios
 *     tags: ["Formularios"]
 *     responses:
 *       200:
 *         description: Lista de formularios
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
 *                     example: "Juan Pérez"
 *                   numeroCelular:
 *                     type: string
 *                     example: "1234567890"
 *                   descripcion:
 *                     type: string
 *                     example: "Necesito información sobre sus servicios."
 *                   fechaEnvio:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-18T12:00:00Z"
 *                   idCliente:
 *                     type: string
 *                     example: "651edc5565bfc2a7f8e98345"
 *                   correoCliente:
 *                     type: string
 *                     format: email
 *                     example: "juan.perez@example.com"
 */
router.get('/', formularioController.listarFormularios);

// Obtener un formulario por ID
/**
 * @swagger
 * /formularios/{id}:
 *   get:
 *     summary: Obtener un formulario por ID
 *     tags: ["Formularios"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del formulario.
 *     responses:
 *       200:
 *         description: Formulario encontrado
 *       404:
 *         description: Formulario no encontrado
 */
router.get('/:id', formularioController.obtenerFormularioPorId);

// Actualizar un formulario por ID
/**
 * @swagger
 * /formularios/{id}:
 *   put:
 *     summary: Actualizar un formulario por ID
 *     tags: ["Formularios"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del formulario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               numeroCelular:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               correoCliente:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Formulario actualizado exitosamente
 *       404:
 *         description: Formulario no encontrado
 */
router.put('/:id', formularioController.actualizarFormulario);

// Eliminar un formulario por ID
/**
 * @swagger
 * /formularios/{id}:
 *   delete:
 *     summary: Eliminar un formulario por ID
 *     tags: ["Formularios"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del formulario.
 *     responses:
 *       200:
 *         description: Formulario eliminado exitosamente
 *       404:
 *         description: Formulario no encontrado
 */
router.delete('/:id', formularioController.eliminarFormulario);

module.exports = router;
