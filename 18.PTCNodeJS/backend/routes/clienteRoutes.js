// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
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
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Cliente creado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', clienteController.crearCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener la lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       404:
 *         description: No se encontraron clientes
 */
router.get('/', clienteController.listarClientes);

/**
 * @swagger
 * /clientes/{correo}:
 *   get:
 *     summary: Buscar un cliente por correo
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:correo', clienteController.buscarClientePorCorreo);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
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
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', clienteController.actualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Desactivar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente desactivado con éxito
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
