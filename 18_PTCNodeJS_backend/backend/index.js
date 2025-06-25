const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configDb/db'); // Conexión a la base de datos
const { swaggerUi, swaggerSpec } = require('./swagger/swagger'); // Configuración de Swagger
const cookieParser = require('cookie-parser'); // Para manejar cookies
const path = require('path');


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
const historialCasoRoutes = require('./routes/historialCasoRoutes');
const casoRoutes = require('./routes/casoRoutes');
const registroCasoRoutes = require('./routes/registroCasoRoutes');
const registroMantenimientoRoutes = require('./routes/registroMantenimientoRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tipoEvidenciaRoutes = require('./routes/tipoEvidenciaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // Asegúrate de que esta línea esté solo una vez

// Conectar a MongoDB
connectDB();

// Inicializar la aplicación Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware para manejar cookies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
    origin: [
        'https://mcwbts7x-5173.use2.devtunnels.ms/',
        'https://6h1lz96w-5173.use2.devtunnels.ms'
    ],
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permitir el envío de cookies y encabezados de autenticación
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
app.use('/api/historiales', historialCasoRoutes);
app.use('/api/caso', casoRoutes);
app.use('/api/registros-caso', registroCasoRoutes);
app.use('/api/registros-mantenimiento', registroMantenimientoRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/tipos-evidencia', tipoEvidenciaRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('API REST ejecutándose correctamente...');
});
