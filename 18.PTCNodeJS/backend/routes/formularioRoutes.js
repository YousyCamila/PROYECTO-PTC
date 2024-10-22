const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

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
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Perez"
 *               numeroCelular:
 *                 type: string
 *                 example: "1234567890"
 *               descripcion:
 *                 type: string
 *                 example: "Solicitud de información sobre servicios"
 *               fechaEnvio:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *               idCliente:
 *                 type: string
 *                 example: "651edc5565bfc2a7f8e98345"
 *               correoCliente:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *     responses:
 *       201:
 *         description: Formulario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', formularioController.crearFormulario);

/**
 * @swagger
 * /formularios/{id}/responder:
 *   post:
 *     summary: Responder a un formulario
 *     tags: ["Formularios"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del formulario que se va a responder
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respuesta:
 *                 type: string
 *                 example: "Gracias por su consulta. Nos comunicaremos pronto."
 *     responses:
 *       200:
 *         description: Respuesta enviada exitosamente
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error al enviar la respuesta
 */
router.post('/:id/responder', formularioController.responderFormulario);

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
 *                     example: "Juan Perez"
 *                   numeroCelular:
 *                     type: string
 *                     example: "1234567890"
 *                   descripcion:
 *                     type: string
 *                     example: "Solicitud de información sobre servicios"
 *                   fechaEnvio:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 *                   idCliente:
 *                     type: string
 *                     example: "651edc5565bfc2a7f8e98345"
 *                   correoCliente:
 *                     type: string
 *                     example: "juan.perez@example.com"
 */
router.get('/', formularioController.obtenerFormularios);

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
 *         description: ID del formulario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulario encontrado
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error al obtener el formulario
 */
router.get('/:id', formularioController.obtenerFormularioPorId);

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
 *         description: ID del formulario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Perez"
 *               numeroCelular:
 *                 type: string
 *                 example: "1234567890"
 *               descripcion:
 *                 type: string
 *                 example: "Solicitud de información actualizada"
 *     responses:
 *       200:
 *         description: Formulario actualizado exitosamente
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error al actualizar el formulario
 */
router.put('/:id', formularioController.actualizarFormulario);

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
 *         description: ID del formulario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulario eliminado exitosamente
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error al eliminar el formulario
 */
router.delete('/:id', formularioController.eliminarFormulario);

module.exports = router;
