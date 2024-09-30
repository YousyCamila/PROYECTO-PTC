// routes/contratoRoutes.js
const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contrato:
 *       type: object
 *       required:
 *         - descripcionServicio
 *         - fechaInicio
 *         - fechaCierre
 *         - tarifa
 *         - idCliente
 *       properties:
 *         descripcionServicio:
 *           type: string
 *           description: Descripción del servicio
 *         fechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del contrato
 *         fechaCierre:
 *           type: string
 *           format: date
 *           description: Fecha de cierre del contrato
 *         clausulas:
 *           type: string
 *           description: Cláusulas del contrato
 *         tarifa:
 *           type: number
 *           format: decimal
 *           description: Tarifa del servicio
 *         estado:
 *           type: boolean
 *           description: Estado del contrato (activo/inactivo)
 *         idCliente:
 *           type: string
 *           description: ID del cliente asociado
 *         idDetective:
 *           type: string
 *           description: ID del detective asociado
 *         historial:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fechaDesactivacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de desactivación del contrato
 *               motivo:
 *                 type: string
 *                 description: Motivo de la desactivación
 */

/**
 * @swagger
 * tags:
 *   name: Contratos
 *   description: API para manejar contratos
 */

/**
 * @swagger
 * /contratos:
 *   post:
 *     summary: Crear un nuevo contrato
 *     tags: [Contratos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contrato'
 *     responses:
 *       201:
 *         description: El contrato ha sido creado exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', contratoController.crearContrato);

/**
 * @swagger
 * /contratos:
 *   get:
 *     summary: Listar todos los contratos
 *     tags: [Contratos]
 *     responses:
 *       200:
 *         description: Lista de todos los contratos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', contratoController.listarContratos);

/**
 * @swagger
 * /contratos/{id}:
 *   get:
 *     summary: Obtener un contrato por ID
 *     tags: [Contratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contrato
 *     responses:
 *       200:
 *         description: Detalles del contrato.
 *       404:
 *         description: Contrato no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', contratoController.buscarContratoPorId);

/**
 * @swagger
 * /contratos/{id}/desactivar:
 *   put:
 *     summary: Desactivar un contrato por ID
 *     tags: [Contratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contrato
 *     responses:
 *       200:
 *         description: Contrato desactivado exitosamente.
 *       404:
 *         description: Contrato no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id/desactivar', contratoController.desactivarContrato);

module.exports = router;
