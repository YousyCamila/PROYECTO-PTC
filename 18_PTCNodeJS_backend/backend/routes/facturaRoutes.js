// routes/facturaRoutes.js
const express = require('express');
const facturaController = require('../controllers/facturaController');

const router = express.Router();

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crea una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaEmision:
 *                 type: string
 *                 format: date
 *               estadoPago:
 *                 type: string
 *               descripcionServicio:
 *                 type: string
 *               totalPagar:
 *                 type: number
 *               idCliente:
 *                 type: string
 *                 format: objectId
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 factura:
 *                   type: object
 *       400:
 *         description: Error al crear la factura
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 */
router.post('/', facturaController.crearFactura);

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Listar todas las facturas
 *     tags: [Factura]
 *     responses:
 *       200:
 *         description: Lista de facturas
 *       400:
 *         description: No se encontraron facturas
 */
router.get('/', facturaController.listarFacturas);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Buscar factura por ID
 *     tags: [Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Detalles de la factura
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', facturaController.buscarFacturaPorId);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura existente
 *     tags: [Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: string
 *           format: objectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaEmision:
 *                 type: string
 *                 format: date
 *               estadoPago:
 *                 type: string
 *                 maxLength: 50
 *               descripcionServicio:
 *                 type: string
 *                 maxLength: 255
 *               totalPagar:
 *                 type: number
 *                 format: decimal
 *               idCliente:
 *                 type: string
 *                 format: objectId
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Factura no encontrada
 */
router.put('/:id', facturaController.actualizarFactura);

/**
 * @swagger
 * /facturas/{id}/desactivar:
 *   patch:
 *     summary: Desactivar una factura
 *     tags: [Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Factura desactivada exitosamente
 *       400:
 *         description: Error al desactivar la factura
 */
router.patch('/:id/desactivar', facturaController.desactivarFactura);

module.exports = router;
