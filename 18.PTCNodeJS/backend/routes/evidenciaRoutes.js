const express = require('express');
const router = express.Router();
const evidenciaControlador = require('../controllers/evidenciaController');
const upload = require('../middleware/upload');

/**
 * @swagger
 * tags:
 *   name: Evidencias
 *   description: API para manejar evidencias
 */

/**
 * @swagger
 * /evidencias:
 *   post:
 *     summary: Crear evidencia
 *     tags: [Evidencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaEvidencia:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la evidencia
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la evidencia
 *               idCasos:
 *                 type: string
 *                 description: ID del caso asociado
 *                 format: objectId
 *               tipoEvidencia:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales']
 *                   description: Tipos de evidencia permitidos
 *     responses:
 *       201:
 *         description: Evidencia creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', evidenciaControlador.crearEvidencia);

/**
 * @swagger
 * /evidencias:
 *   get:
 *     summary: Listar evidencias
 *     tags: [Evidencias]
 *     responses:
 *       200:
 *         description: Lista de evidencias activas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fechaEvidencia:
 *                     type: string
 *                     format: date-time
 *                   descripcion:
 *                     type: string
 *                   idCasos:
 *                     type: string
 *                     format: objectId
 *                   tipoEvidencia:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Error al obtener evidencias
 */
router.get('/', evidenciaControlador.listarEvidencias);

/**
 * @swagger
 * /evidencias/{id}:
 *   get:
 *     summary: Buscar evidencia por ID
 *     tags: [Evidencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la evidencia
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Evidencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fechaEvidencia:
 *                   type: string
 *                   format: date-time
 *                 descripcion:
 *                   type: string
 *                 idCasos:
 *                   type: string
 *                   format: objectId
 *                 tipoEvidencia:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Evidencia no encontrada
 *       500:
 *         description: Error al obtener la evidencia
 */
router.get('/:id', evidenciaControlador.buscarEvidenciaPorId);

/**
 * @swagger
 * /evidencias/{id}:
 *   put:
 *     summary: Actualizar evidencia
 *     tags: [Evidencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la evidencia
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
 *               fechaEvidencia:
 *                 type: string
 *                 format: date-time
 *               descripcion:
 *                 type: string
 *               idCasos:
 *                 type: string
 *                 format: objectId
 *               tipoEvidencia:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales']
 *     responses:
 *       200:
 *         description: Evidencia actualizada exitosamente
 *       404:
 *         description: Evidencia no encontrada
 *       500:
 *         description: Error al actualizar la evidencia
 */
router.put('/:id', evidenciaControlador.actualizarEvidencia);

/**
 * @swagger
 * /evidencias/{id}/desactivar:
 *   patch:
 *     summary: Desactivar evidencia
 *     tags: [Evidencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la evidencia
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Evidencia desactivada exitosamente
 *       404:
 *         description: Evidencia no encontrada
 *       500:
 *         description: Error al desactivar la evidencia
 */
router.patch('/:id/desactivar', evidenciaControlador.desactivarEvidencia);

/**
 * @swagger
 * /evidencias/upload:
 *   post:
 *     summary: Subir una nueva evidencia con archivo adjunto
 *     tags: [Evidencias]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fechaEvidencia:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la evidencia
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la evidencia
 *               idCasos:
 *                 type: string
 *                 format: objectId
 *                 description: ID del caso relacionado
 *               tipoEvidencia:
 *                 type: string
 *                 enum: [tipoDocumento, tipoFotografia, tipoVideo, tipoAudio, archivosDigitales]
 *                 description: Tipo de evidencia
 *               archivo:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir
 *     responses:
 *       201:
 *         description: Evidencia creada con éxito
 *       400:
 *         description: Error en la carga del archivo
 *       500:
 *         description: Error del servidor
 */
router.post('/upload', upload.single('archivo'), evidenciaControlador.subirEvidencia);

/**
 * @swagger
 * /evidencias/caso/{idCaso}:
 *   get:
 *     summary: Obtener todas las evidencias asociadas a un caso específico
 *     tags: [Evidencias]
 *     parameters:
 *       - name: idCaso
 *         in: path
 *         required: true
 *         description: ID del caso para obtener sus evidencias asociadas
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Lista de evidencias asociadas al caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID de la evidencia
 *                       fechaEvidencia:
 *                         type: string
 *                         format: date
 *                         description: Fecha de la evidencia
 *                       descripcion:
 *                         type: string
 *                         description: Descripción de la evidencia
 *                       tipoEvidencia:
 *                         type: string
 *                         description: Tipo de evidencia (ej. tipoDocumento, tipoFotografia)
 *                       archivo:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre del archivo
 *                           tipo:
 *                             type: string
 *                             description: Tipo MIME del archivo
 *                           url:
 *                             type: string
 *                             description: URL para acceder al archivo (ubicado en la carpeta /uploads)
 *       404:
 *         description: No se encontraron evidencias para este caso
 *       500:
 *         description: Error interno del servidor
 */
router.get('/evidencias/caso/:idCaso', evidenciaControlador.obtenerEvidenciasPorCaso);



module.exports = router;
