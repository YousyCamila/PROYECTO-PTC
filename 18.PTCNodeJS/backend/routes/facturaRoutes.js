const express = require('express');
const router = express.Router();
const facturaController = require('../controller/facturaController');

// Crear una nueva factura
/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     tags: ["Facturas"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *                 example: "651edc5565bfc2a7f8e98345"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *               montoTotal:
 *                 type: number
 *                 example: 1500.00
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', facturaController.crearFactura);

// Obtener todas las facturas
/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Listar todas las facturas
 *     tags: ["Facturas"]
 *     responses:
 *       200:
 *         description: Lista de facturas
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
 *                   clienteId:
 *                     type: string
 *                     example: "651edc5565bfc2a7f8e98345"
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 *                   montoTotal:
 *                     type: number
 *                     example: 1500.00
 */
router.get('/', facturaController.obtenerFacturas);

// Obtener una factura por ID
/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: ["Facturas"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la factura.
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', facturaController.obtenerFacturaPorId);

// Actualizar una factura por ID
/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura por ID
 *     tags: ["Facturas"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la factura.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               montoTotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       404:
 *         description: Factura no encontrada
 */
router.put('/:id', facturaController.actualizarFactura);

// Eliminar una factura por ID
/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura por ID
 *     tags: ["Facturas"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la factura.
 *     responses:
 *       200:
 *         description: Factura eliminada exitosamente
 *       404:
 *         description: Factura no encontrada
 */
router.delete('/:id', facturaController.eliminarFactura);

module.exports = router;
