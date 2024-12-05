const express = require('express');
const router = express.Router();
const evidenciaControlador = require('../controllers/evidenciaController');
const upload = require('../middleware/upload');
const { check } = require('express-validator');

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
 *     summary: Listar todas las evidencias
 *     tags: [Evidencias]
 *     responses:
 *       200:
 *         description: Lista de evidencias obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la evidencia
 *                     example: "648df1239a1b2c456789abcd"
 *                   fechaEvidencia:
 *                     type: string
 *                     format: date
 *                     description: Fecha de la evidencia
 *                     example: "2024-12-05"
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la evidencia
 *                     example: "Evidencia de prueba"
 *                   idCasos:
 *                     type: string
 *                     format: objectId
 *                     description: ID del caso relacionado
 *                     example: "674aa23735f37f69e0aadd58"
 *                   tipoEvidencia:
 *                     type: string
 *                     description: Tipo de evidencia
 *                     example: "tipoFotografia"
 *                   archivo:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         description: Nombre del archivo
 *                         example: "example.jpg"
 *                       tipo:
 *                         type: string
 *                         description: Tipo MIME del archivo
 *                         example: "image/jpeg"
 *                       ruta:
 *                         type: string
 *                         description: Ruta del archivo
 *                         example: "uploads/example.jpg"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación de la evidencia
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Última fecha de actualización de la evidencia
 *       500:
 *         description: Error interno del servidor
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
 *         description: ID de la evidencia a buscar
 *         schema:
 *           type: string
 *           format: objectId
 *           example: "648df1239a1b2c456789abcd"
 *     responses:
 *       200:
 *         description: Evidencia encontrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la evidencia
 *                   example: "648df1239a1b2c456789abcd"
 *                 fechaEvidencia:
 *                   type: string
 *                   format: date
 *                   description: Fecha de la evidencia
 *                   example: "2024-12-05"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la evidencia
 *                   example: "Evidencia de prueba"
 *                 idCasos:
 *                   type: string
 *                   format: objectId
 *                   description: ID del caso relacionado
 *                   example: "674aa23735f37f69e0aadd58"
 *                 tipoEvidencia:
 *                   type: string
 *                   description: Tipo de evidencia
 *                   example: "tipoFotografia"
 *                 archivo:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       description: Nombre del archivo
 *                       example: "example.jpg"
 *                     tipo:
 *                       type: string
 *                       description: Tipo MIME del archivo
 *                       example: "image/jpeg"
 *                     ruta:
 *                       type: string
 *                       description: Ruta del archivo
 *                       example: "uploads/example.jpg"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la evidencia
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Última fecha de actualización de la evidencia
 *       400:
 *         description: ID de evidencia inválido
 *       404:
 *         description: No se encontró la evidencia
 *       500:
 *         description: Error interno del servidor
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
 *           example: "674aa23735f37f69e0aadd58"
 *     responses:
 *       200:
 *         description: Lista de evidencias asociadas al caso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evidencias encontradas
 *                 evidencias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID de la evidencia
 *                         example: "648df1239a1b2c456789abcd"
 *                       fechaEvidencia:
 *                         type: string
 *                         format: date
 *                         description: Fecha de la evidencia
 *                         example: "2024-12-05"
 *                       descripcion:
 *                         type: string
 *                         description: Descripción de la evidencia
 *                         example: "Evidencia de prueba"
 *                       tipoEvidencia:
 *                         type: string
 *                         description: Tipo de evidencia
 *                         example: "tipoFotografia"
 *                       archivo:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre del archivo
 *                             example: "example.jpg"
 *                           tipo:
 *                             type: string
 *                             description: Tipo MIME del archivo
 *                             example: "image/jpeg"
 *                           ruta:
 *                             type: string
 *                             description: Ruta del archivo
 *                             example: "uploads/example.jpg"
 *       400:
 *         description: ID del caso inválido
 *       404:
 *         description: No se encontraron evidencias para el caso
 *       500:
 *         description: Error interno del servidor
 */
router.get('/caso/:idCaso', evidenciaControlador.obtenerEvidenciasPorCaso);



module.exports = router;
