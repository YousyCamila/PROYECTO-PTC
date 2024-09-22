const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Crear un nuevo rol
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: ["Roles"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Administrador"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', rolController.crearRol);

// Obtener todos los roles
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Listar todos los roles
 *     tags: ["Roles"]
 *     responses:
 *       200:
 *         description: Lista de roles
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
 *                     example: "Administrador"
 */
router.get('/', rolController.obtenerRoles);

// Obtener un rol por ID
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: ["Roles"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del rol.
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 */
router.get('/:id', rolController.obtenerRolPorId);

// Actualizar un rol por ID
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol por ID
 *     tags: ["Roles"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del rol.
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
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Rol no encontrado
 */
router.put('/:id', rolController.actualizarRol);

// Eliminar un rol por ID
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol por ID
 *     tags: ["Roles"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del rol.
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 */
router.delete('/:id', rolController.eliminarRol);

module.exports = router;
