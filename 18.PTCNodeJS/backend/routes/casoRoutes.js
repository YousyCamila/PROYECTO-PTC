const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: API para gestionar casos.
 */

/**
 * @swagger
 * /caso:
 *   post:
 *     summary: Crear un nuevo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cadenaCustodia:
 *                 type: string
 *               idCliente:
 *                 type: string
 *               idDetective:
 *                 type: string
 *               nombreCaso:
 *                 type: string
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Caso creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error al crear el caso.
 */
router.post('/', casoController.crearCaso);

/**
 * @swagger
 * /caso:
 *   get:
 *     summary: Listar todos los casos
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Lista de casos.
 *       500:
 *         description: Error al listar los casos.
 */
router.get('/', casoController.listarCasos);

/**
 * @swagger
 * /caso/{id}:
 *   get:
 *     summary: Buscar un caso por ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del caso a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado.
 *       404:
 *         description: Caso no encontrado.
 *       500:
 *         description: Error al buscar el caso.
 */
router.get('/:id',casoController.buscarCasoPorId);

/**
 * @swagger
 * /caso/{id}:
 *   put:
 *     summary: Actualizar un caso por ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del caso a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cadenaCustodia:
 *                 type: string
 *               investigacionExtorsion:
 *                 type: string
 *               estudiosSeguridad:
 *                 type: string
 *               investigacionInfidelidades:
 *                 type: string
 *               investigacionRobosEmpresariales:
 *                 type: string
 *               antecedentes:
 *                 type: string
 *               recuperacionVehiculos:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso actualizado exitosamente.
 *       404:
 *         description: Caso no encontrado.
 *       500:
 *         description: Error al actualizar el caso.
 */
router.put('/:id', casoController.actualizarCaso);

/**
 * @swagger
 * /caso/{id}:
 *   delete:
 *     summary: Desactivar un caso por ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del caso a desactivar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso desactivado exitosamente.
 *       404:
 *         description: Caso no encontrado.
 *       500:
 *         description: Error al desactivar el caso.
 */
router.delete('/:id', casoController.desactivarCaso);

/**
 * @swagger
 * /caso/cliente/{id}:
 *   get:
 *     summary: Obtener todos los casos asociados a un cliente específico
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de casos asociados al cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del caso
 *                   nombreCaso:
 *                     type: string
 *                     description: Nombre del caso
 *                   idDetective:
 *                     type: string
 *                     description: ID del detective asignado
 *                   evidencias:
 *                     type: array
 *                     items:
 *                       type: string
 *                   activo:
 *                     type: boolean
 *       400:
 *         description: ID de cliente no válida
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/cliente/:id', casoController.obtenerCasosPorClienteId);

/**
 * @swagger
 * /caso/cliente/email/{email}:
 *   get:
 *     summary: Obtener casos, contratos y registros asociados a un cliente por su correo electrónico.
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo electrónico del cliente.
 *     responses:
 *       200:
 *         description: Lista de casos, contratos y registros asociados al cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 casos:
 *                   type: array
 *                   items:
 *                     type: object
 *                 contratos:
 *                   type: array
 *                   items:
 *                     type: object
 *                 registros:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No se encontraron datos para el cliente especificado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/cliente/email/:email', casoController.obtenerCasosPorEmailCliente);

module.exports = router;