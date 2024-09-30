const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

/**
 * @swagger
 * /administradors:
 *   post:
 *     summary: Crear un nuevo administrador
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoDocumento:
 *                 type: string
 *                 example: "C.C."
 *               numeroDocumento:
 *                 type: string
 *                 example: "123456789"
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
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Administrador creado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', administradorController.crearAdministrador);

/**
 * @swagger
 * /administradors:
 *   get:
 *     summary: Obtener la lista de administradores
 *     tags: [Administradores]
 *     responses:
 *       200:
 *         description: Lista de administradores
 *       404:
 *         description: No se encontraron administradores
 */
router.get('/', administradorController.listarAdministradores);

/**
 * @swagger
 * /administradors/{correo}:
 *   get:
 *     summary: Buscar un administrador por correo
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo del administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *       404:
 *         description: Administrador no encontrado
 */
router.get('/:correo', administradorController.buscarAdministradorPorCorreo);

/**
 * @swagger
 * /administradors/{id}:
 *   put:
 *     summary: Actualizar un administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: "Juan Carlos"
 *               apellidos:
 *                 type: string
 *                 example: "Pérez López"
 *               correo:
 *                 type: string
 *                 example: "juancarlos.perez@example.com"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Administrador actualizado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', administradorController.actualizarAdministrador);

/**
 * @swagger
 * /administradors/{id}:
 *   delete:
 *     summary: Desactivar un administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del administrador
 *     responses:
 *       200:
 *         description: Administrador desactivado con éxito
 *       404:
 *         description: Administrador no encontrado
 */
router.delete('/:id', administradorController.desactivarAdministrador);

module.exports = router;
