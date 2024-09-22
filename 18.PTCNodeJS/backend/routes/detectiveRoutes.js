const express = require('express');
const router = express.Router();
const detectiveController = require('../controllers/detectiveController');

// Crear un nuevo detective
/**
 * @swagger
 * /detectives:
 *   post:
 *     summary: Crear un nuevo detective
 *     tags: ["Detectives"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos Detective"
 *               especialidad:
 *                 type: string
 *                 example: "Investigación criminal"
 *               telefono:
 *                 type: string
 *                 example: "555-6789"
 *     responses:
 *       201:
 *         description: Detective creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', detectiveController.crearDetective);

// Obtener todos los detectives
/**
 * @swagger
 * /detectives:
 *   get:
 *     summary: Listar todos los detectives
 *     tags: ["Detectives"]
 *     responses:
 *       200:
 *         description: Lista de detectives
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
 *                     example: "Carlos Detective"
 *                   especialidad:
 *                     type: string
 *                     example: "Investigación criminal"
 *                   telefono:
 *                     type: string
 *                     example: "555-6789"
 */
router.get('/', detectiveController.listarDetectives);

// Obtener un detective por ID
/**
 * @swagger
 * /detectives/{id}:
 *   get:
 *     summary: Obtener un detective por ID
 *     tags: ["Detectives"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del detective.
 *     responses:
 *       200:
 *         description: Detective encontrado
 *       404:
 *         description: Detective no encontrado
 */
router.get('/:id', detectiveController.obtenerDetectivePorEmail);

// Actualizar un detective por ID
/**
 * @swagger
 * /detectives/{id}:
 *   put:
 *     summary: Actualizar un detective por ID
 *     tags: ["Detectives"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del detective.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Detective actualizado exitosamente
 *       404:
 *         description: Detective no encontrado
 */
router.put('/:id', detectiveController.actualizarDetective);

// Eliminar un detective por ID
/**
 * @swagger
 * /detectives/{id}:
 *   delete:
 *     summary: Eliminar un detective por ID
 *     tags: ["Detectives"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del detective.
 *     responses:
 *       200:
 *         description: Detective eliminado exitosamente
 *       404:
 *         description: Detective no encontrado
 */
router.delete('/:id', detectiveController.eliminarDetective);

module.exports = router;
