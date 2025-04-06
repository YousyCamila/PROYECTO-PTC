const express = require('express');
const router = express.Router();
const historialCasoController = require('../controllers/historialCasoController');

/**
 * @swagger
 * tags:
 *   name: Historiales
 *   description: Endpoints para manejar historiales de casos.
 */

/**
 * @swagger
 * /historiales:
 *   post:
 *     summary: Crear un nuevo historial para un caso.
 *     tags: [Historiales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCaso
 *               - nombreCliente
 *               - descripcionObjetivo
 *               - informacionInicial
 *             properties:
 *               idCaso:
 *                 type: string
 *               nombreCliente:
 *                 type: string
 *               descripcionObjetivo:
 *                 type: string
 *               informacionInicial:
 *                 type: string
 *     responses:
 *       201:
 *         description: Historial creado con éxito.
 */
router.post('/', historialCasoController.crearHistorial);

/**
 * @swagger
 * /historiales/id/{id}:
 *   get:
 *     summary: Obtener historial por su ID único.
 *     tags: [Historiales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del historial.
 *     responses:
 *       200:
 *         description: Historial encontrado con éxito.
 */
router.get('/id/:id', historialCasoController.obtenerHistorialPorId);

/**
 * @swagger
 * /historiales/todos:
 *   get:
 *     summary: Obtener todos los historiales.
 *     tags: [Historiales]
 *     responses:
 *       200:
 *         description: Lista de todos los historiales.
 */
router.get('/todos', historialCasoController.obtenerTodosLosHistoriales);

/**
 * @swagger
 * /historiales/relacionado/{idCaso}:
 *   get:
 *     summary: Obtener información relacionada al historial sin duplicar datos.
 *     tags: [Historiales]
 *     parameters:
 *       - in: path
 *         name: idCaso
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del caso.
 *     responses:
 *       200:
 *         description: Información relacionada obtenida con éxito.
 */
router.get('/relacionado/:idCaso', historialCasoController.obtenerInformacionRelacionadaHistorial);

/**
 * @swagger
 * /historiales/accion:
 *   post:
 *     summary: Agregar una acción al historial de un caso.
 *     tags: [Historiales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCaso
 *               - accion
 *               - detalles
 *               - usuarioId
 *             properties:
 *               idCaso:
 *                 type: string
 *               accion:
 *                 type: string
 *               detalles:
 *                 type: string
 *               usuarioId:
 *                 type: string
 *               documentoRelacionado:
 *                 type: string
 *               tipoDocumento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Acción agregada con éxito.
 */
router.post('/accion', historialCasoController.agregarAccion);

/**
 * @swagger
 * /api/historial/accion/automatica:
 *   post:
 *     summary: Registrar acción automática (Ej. Reporte o Evidencia creada).
 *     tags: [Historiales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCaso
 *               - descripcion
 *               - usuarioId
 *             properties:
 *               idCaso:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Acción registrada automáticamente con éxito.
 */
router.post('/accion/automatica', historialCasoController.registrarAccionAutomatica);

/**
 * @swagger
 * /api/historial/{idCaso}:
 *   get:
 *     summary: Obtener historial completo por ID de caso.
 *     tags: [Historiales]
 *     parameters:
 *       - in: path
 *         name: idCaso
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del caso.
 *     responses:
 *       200:
 *         description: Historial encontrado con éxito.
 */
router.get('/:idCaso', historialCasoController.obtenerHistorialCompleto);

module.exports = router;
