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
 * /historiales/agregar-accion:
 *   post:
 *     summary: Agrega una acción al historial del caso
 *     tags: [Historiales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idHistorial
 *               - accion
 *               - detalles
 *               - usuarioId
 *               - usuarioTipo
 *             properties:
 *               idHistorial:
 *                 type: string
 *                 description: ID del historial al cual agregar la acción
 *               accion:
 *                 type: string
 *                 enum:
 *                   - Evidencia agregada
 *                   - Evidencia eliminada
 *                   - Reporte generado
 *                   - Reporte modificado
 *                   - Contrato creado
 *                   - Contrato modificado
 *                   - Contrato eliminado
 *                   - Cambio de estado
 *                   - Comentario agregado
 *                   - Caso reasignado
 *                   - Caso cerrado
 *                   - Caso archivado
 *               detalles:
 *                 type: string
 *               usuarioId:
 *                 type: string
 *               usuarioTipo:
 *                 type: string
 *                 enum: [Cliente, Detective]
 *               documentoRelacionado:
 *                 type: string
 *                 nullable: true
 *               tipoDocumento:
 *                 type: string
 *                 enum: [Evidencia, RegistroCaso, Contrato]
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Acción agregada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 idHistorial:
 *                   type: string
 *                 historial:
 *                   $ref: '#/components/schemas/HistorialCaso'
 *       400:
 *         description: Error al agregar la acción
 */
router.post('/agregar-accion', historialCasoController.agregarAccion);

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
 * /historiales/caso/{idCaso}:
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
router.get('/caso/:idCaso', historialCasoController.obtenerHistorialCompleto);
    
module.exports = router;
