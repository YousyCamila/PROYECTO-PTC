const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// Crear una nueva persona
/**
 * @swagger
 * /personas:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: ["Personas"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "12345678A"
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               correo:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               telefono:
 *                 type: string
 *                 example: "555-1234"
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', personaController.crearPersona);

// Obtener todas las personas
/**
 * @swagger
 * /personas:
 *   get:
 *     summary: Listar todas las personas
 *     tags: ["Personas"]
 *     responses:
 *       200:
 *         description: Lista de personas
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
 *                   dni:
 *                     type: string
 *                     example: "12345678A"
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   correo:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   telefono:
 *                     type: string
 *                     example: "555-1234"
 */
router.get('/', personaController.listarPersonas);

// Obtener una persona por correo electrónico
/**
 * @swagger
 * /personas/email/{email}:
 *   get:
 *     summary: Obtener una persona por correo electrónico
 *     tags: ["Personas"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico de la persona.
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
router.get('/email/:email', personaController.obtenerPersonaPorEmail);

// Actualizar una persona por ID
/**
 * @swagger
 * /personas/{id}:
 *   put:
 *     summary: Actualizar una persona por ID
 *     tags: ["Personas"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la persona.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.put('/:id', personaController.actualizarPersona);

// Eliminar una persona por ID
/**
 * @swagger
 * /personas/{id}:
 *   delete:
 *     summary: Eliminar una persona por ID
 *     tags: ["Personas"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la persona.
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/:id', personaController.eliminarPersona);

module.exports = router;
