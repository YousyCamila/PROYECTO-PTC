// routes/detectiveRoutes.js
const express = require('express');
const router = express.Router();
const detectiveController = require('../controllers/detectiveController');

/**
 * @swagger
 * /detectives:
 *   post:
 *     summary: Crear un nuevo detective
 *     tags: [Detectives]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               especialidad:
 *                 type: string
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Detective creado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', detectiveController.crearDetective);

/**
 * @swagger
 * /detectives:
 *   get:
 *     summary: Obtener la lista de detectives
 *     tags: [Detectives]
 *     responses:
 *       200:
 *         description: Lista de detectives
 *       404:
 *         description: No se encontraron detectives
 */
router.get('/', detectiveController.listarDetectives);



/**
 * @swagger
 * /detectives/{id}:
 *   get:
 *     summary: Obtener un detective por ID
 *     tags: [Detectives]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detective
 *     responses:
 *       200:
 *         description: Detective encontrado
 *       404:
 *         description: Detective no encontrado
 */
router.get('/:id', detectiveController.buscarDetectivePorId);

/**
 * @swagger
 * /detectives/{correo}:
 *   get:
 *     summary: Buscar un detective por correo
 *     tags: [Detectives]
 *     parameters:
 *       - in: path
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo del detective
 *     responses:
 *       200:
 *         description: Detective encontrado
 *       404:
 *         description: Detective no encontrado
 */
router.get('/:correo', detectiveController.buscarDetectivePorCorreo);

/**
 * @swagger
 * /detectives/{id}:
 *   put:
 *     summary: Actualizar un detective
 *     tags: [Detectives]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detective
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               especialidad:
 *                 type: string
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Detective actualizado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', detectiveController.actualizarDetective);

/**
 * @swagger
 * /detectives/{id}:
 *   patch:
 *     summary: Desactivar un detective
 *     tags: [Detectives]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detective
 *     responses:
 *       200:
 *         description: Detective desactivado con éxito
 *       404:
 *         description: Detective no encontrado
 */
router.patch('/:id', detectiveController.desactivarDetective);


module.exports = router;
