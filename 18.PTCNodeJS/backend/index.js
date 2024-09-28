const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // Para manejar variables de entorno
const connectDB = require('./configDB/db'); // Conexión a la base de datos
const { swaggerUi, swaggerSpec } = require('./swagger/swagger'); // Configuración de Swagger

dotenv.config(); // Carga las variables del archivo .env

// Importar las rutas
const administradorRoutes = require('./routes/administradorRoutes');
const auditoriaRoutes = require('./routes/auditoriaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const contratoRoutes = require('./routes/contratoRoutes');
const detectiveRoutes = require('./routes/detectiveRoutes');
const evidenciaRoutes = require('./routes/evidenciaRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const formularioRoutes = require('./routes/formularioRoutes');
const historialRoutes = require('./routes/historialRoutes');

const registroCasoRoutes = require('./routes/registroCasoRoutes');
const registroMantenimientoRoutes = require('./routes/registroMantenimientoRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tipoEvidenciaRoutes = require('./routes/tipoEvidenciaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Conectar a MongoDB
connectDB();

// Inicializar la aplicación Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
    origin: '*', // Ajusta esto con los dominios permitidos de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Rutas de Swagger para documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configurar rutas de API
app.use('/api/administradors', administradorRoutes);
app.use('/api/auditorias', auditoriaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/contratos', contratoRoutes);
app.use('/api/detectives', detectiveRoutes);
app.use('/api/evidencias', evidenciaRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/formularios', formularioRoutes);
app.use('/api/historiales', historialRoutes);

app.use('/api/registros-caso', registroCasoRoutes);
app.use('/api/registros-mantenimiento', registroMantenimientoRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/tipos-evidencia', tipoEvidenciaRoutes);
app.use('/api/usuarios', usuarioRoutes);

const port = 3000; // Establece el puerto directamente en el código

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('API REST ejecutándose correctamente...');
});
