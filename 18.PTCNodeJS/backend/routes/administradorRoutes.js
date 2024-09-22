const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

// Crear un nuevo administrador
/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Crear un nuevo administrador
 *     tags: ["Administradores"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "María González"
 *               correo:
 *                 type: string
 *                 example: "maria.gonzalez@example.com"
 *               telefono:
 *                 type: string
 *                 example: "555-9876"
 *               password:
 *                 type: string
 *                 example: "ContraseñaSegura"
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', administradorController.crearAdministrador);

// Obtener todos los administradores
/**
 * @swagger
 * /administradores:
 *   get:
 *     summary: Listar todos los administradores
 *     tags: ["Administradores"]
 *     responses:
 *       200:
 *         description: Lista de administradores
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
 *                     example: "María González"
 *                   correo:
 *                     type: string
 *                     example: "maria.gonzalez@example.com"
 *                   telefono:
 *                     type: string
 *                     example: "555-9876"
 */
router.get('/', administradorController.listarAdministradores);

// Obtener un administrador por ID
/**
 * @swagger
 * /administradores/{id}:
 *   get:
 *     summary: Obtener un administrador por ID
 *     tags: ["Administradores"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del administrador.
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *       404:
 *         description: Administrador no encontrado
 */
router.get('/:id', administradorController.obtenerAdministradorPorEmail);

// Actualizar un administrador por ID
/**
 * @swagger
 * /administradores/{id}:
 *   put:
 *     summary: Actualizar un administrador por ID
 *     tags: ["Administradores"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del administrador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.put('/:id', administradorController.actualizarAdministrador);

// Eliminar un administrador por ID
/**
 * @swagger
 * /administradores/{id}:
 *   delete:
 *     summary: Eliminar un administrador por ID
 *     tags: ["Administradores"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del administrador.
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.delete('/:id', administradorController.eliminarAdministrador);

module.exports = router;
