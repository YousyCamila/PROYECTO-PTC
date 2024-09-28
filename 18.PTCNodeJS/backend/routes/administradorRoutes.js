const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

/**
 * @swagger
 * /administradors:
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
 *               dni:
 *                 type: string
 *                 example: "12345678"
 *               nombres:
 *                 type: string
 *                 example: "Juan"
 *               apellidos:
 *                 type: string
 *                 example: "Pérez"
 *               correo:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               especialidad:
 *                 type: string
 *                 example: "Gestión"
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: Ya existe una persona con ese DNI
 */

router.post('/', administradorController.crearAdministrador);

/**
 * @swagger
 * /administradors:
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
 *                   username:
 *                     type: string
 *                     example: "admin123"
 *                   email:
 *                     type: string
 *                     example: "admin@example.com"
 */
router.get('/', administradorController.listarAdministradores);

/**
 * @swagger
 * /administradors/{email}:
 *   get:
 *     summary: Obtener un administrador por email
 *     tags: ["Administradores"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *       404:
 *         description: Administrador no encontrado
 */
router.get('/:email', administradorController.obtenerAdministradorPorEmail);

/**
 * @swagger
 * /administradors/{email}:
 *   put:
 *     summary: Actualizar un administrador por email
 *     tags: ["Administradores"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.put('/:email', administradorController.actualizarAdministrador);

/**
 * @swagger
 * /administradors/{email}:
 *   delete:
 *     summary: Desactivar un administrador por email
 *     tags: ["Administradores"]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del administrador
 *     responses:
 *       200:
 *         description: Administrador desactivado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.delete('/:email', administradorController.desactivarAdministrador);

module.exports = router;
