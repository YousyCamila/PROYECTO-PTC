const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

// Crear un nuevo cliente
/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: ["Clientes"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', clienteController.crearCliente);

// Obtener todos los clientes
/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: ["Clientes"]
 *     responses:
 *       200:
 *         description: Lista de clientes
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
 *                   correo:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   telefono:
 *                     type: string
 *                     example: "555-1234"
 */
router.get('/', clienteController.obtenerClientes);

// Obtener un cliente por ID
/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: ["Clientes"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del cliente.
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', clienteController.obtenerClientePorId);

// Actualizar un cliente por ID
/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: ["Clientes"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del cliente.
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
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/:id', clienteController.actualizarCliente);

// Eliminar un cliente por ID
/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: ["Clientes"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del cliente.
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
