const express = require('express');
const router = express.Router();
const registroCasoController = require('../controllers/registroCasoController');

/**
 * @swagger
 * tags:
 *   - name: Registros de Caso
 *     description: API para manejar registros de casos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroCaso:
 *       type: object
 *       properties:
 *         descripcion:
 *           type: string
 *           description: Descripción del caso
 *           example: "Caso de robo en una tienda"
 *         fechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del caso
 *           example: "2023-09-29"
 *         fechaFinalizacion:
 *           type: string
 *           format: date
 *           description: Fecha de finalización del caso
 *           example: "2023-10-29"
 *         estadoRegistro:
 *           type: string
 *           description: Estado del registro
 *           example: "En progreso"
 *         seguimientoPorcentaje:
 *           type: number
 *           format: decimal
 *           description: Porcentaje de seguimiento del caso
 *           example: 75.5
 *         idCasos:
 *           type: string
 *           description: ID del caso relacionado
 *           example: "60d5ec49b64e8e1a8c61d024"
 *         idCliente:
 *           type: string
 *           description: ID del cliente relacionado
 *           example: "60d5ec49b64e8e1a8c61d025"
 *         idDetective:
 *           type: string
 *           description: ID del detective relacionado
 *           example: "60d5ec49b64e8e1a8c61d026"
 */

/**
 * @swagger
 * /registros-caso:
 *   post:
 *     summary: Crear un nuevo registro de caso
 *     tags: [Registros de Caso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroCaso'
 *     responses:
 *       201:
 *         description: El registro de caso ha sido creado exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', registroCasoController.crearRegistroCaso);

/**
 * @swagger
 * /registros-caso:
 *   get:
 *     summary: Listar todos los registros de caso
 *     tags: [Registros de Caso]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de caso.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', registroCasoController.listarRegistroCasos);

/**
 * @swagger
 * /registros-caso/{id}:
 *   get:
 *     summary: Obtener un registro de caso por ID
 *     tags: [Registros de Caso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de caso
 *     responses:
 *       200:
 *         description: Detalles del registro de caso.
 *       404:
 *         description: Registro de caso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', registroCasoController.buscarRegistroCasoPorId);

/**
 * @swagger
 * /registros-caso/{id}:
 *   put:
 *     summary: Actualizar un registro de caso por ID
 *     tags: [Registros de Caso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroCaso'
 *     responses:
 *       200:
 *         description: Registro de caso actualizado exitosamente.
 *       404:
 *         description: Registro de caso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', registroCasoController.actualizarRegistroCaso);

/**
 * @swagger
 * /registros-caso/{id}/desactivar:
 *   put:
 *     summary: Desactivar un registro de caso por ID
 *     tags: [Registros de Caso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de caso
 *     responses:
 *       200:
 *         description: Registro de caso desactivado exitosamente.
 *       404:
 *         description: Registro de caso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id/desactivar', registroCasoController.desactivarRegistroCaso);

/**
 * @swagger
 * /registros-caso/{id}/finalizar:
 *   put:
 *     summary: Finalizar un registro de caso por ID
 *     tags: [Registros de Caso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de caso
 *     responses:
 *       200:
 *         description: Registro de caso finalizado exitosamente.
 *       404:
 *         description: Registro de caso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id/finalizar', registroCasoController.finalizarRegistroCaso);

module.exports = router;
