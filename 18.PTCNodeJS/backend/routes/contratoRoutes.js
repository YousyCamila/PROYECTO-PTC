const express = require('express');
const router = express.Router();
const contratoController = require('../controller/contratoController');

// Crear un nuevo contrato
/**
 * @swagger
 * /contratos:
 *   post:
 *     summary: Crear un nuevo contrato
 *     tags: ["Contratos"]
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
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-01"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               monto:
 *                 type: number
 *                 example: 5000.00
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', contratoController.crearContrato);

// Obtener todos los contratos
/**
 * @swagger
 * /contratos:
 *   get:
 *     summary: Listar todos los contratos
 *     tags: ["Contratos"]
 *     responses:
 *       200:
 *         description: Lista de contratos
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
 *                   fechaInicio:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-01"
 *                   fechaFin:
 *                     type: string
 *                     format: date
 *                     example: "2025-09-01"
 *                   monto:
 *                     type: number
 *                     example: 5000.00
 */
router.get('/', contratoController.obtenerContratos);

// Obtener un contrato por ID
/**
 * @swagger
 * /contratos/{id}:
 *   get:
 *     summary: Obtener un contrato por ID
 *     tags: ["Contratos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del contrato.
 *     responses:
 *       200:
 *         description: Contrato encontrado
 *       404:
 *         description: Contrato no encontrado
 */
router.get('/:id', contratoController.obtenerContratoPorId);

// Actualizar un contrato por ID
/**
 * @swagger
 * /contratos/{id}:
 *   put:
 *     summary: Actualizar un contrato por ID
 *     tags: ["Contratos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del contrato.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               monto:
 *                 type: number
 *     responses:
 *       200:
 *         description: Contrato actualizado exitosamente
 *       404:
 *         description: Contrato no encontrado
 */
router.put('/:id', contratoController.actualizarContrato);

// Eliminar un contrato por ID
/**
 * @swagger
 * /contratos/{id}:
 *   delete:
 *     summary: Eliminar un contrato por ID
 *     tags: ["Contratos"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del contrato.
 *     responses:
 *       200:
 *         description: Contrato eliminado exitosamente
 *       404:
 *         description: Contrato no encontrado
 */
router.delete('/:id', contratoController.eliminarContrato);

module.exports = router;
