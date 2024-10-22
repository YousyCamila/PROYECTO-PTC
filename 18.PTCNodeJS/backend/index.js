const express = require('express');
const loadRoutes = require('./routes/RoutesLoader')
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // Para manejar variables de entorno
const connectDB = require('./configDB/db'); // Conexión a la base de datos
const { swaggerUi, swaggerSpec } = require('./swagger/swagger'); // Configuración de Swagger
const sessionMiddleware = require('./middleware/middleware');

dotenv.config(); // Carga las variables del archivo .env

// Conectar a MongoDB
connectDB();

// Inicializar la aplicación Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sessionMiddleware(app);

// Configuración de CORS
const corsOptions = {
    origin: '*', // Ajusta esto con los dominios permitidos de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Rutas de Swagger para documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

loadRoutes(app);

// Configurar rutas de API


const port = 3000; // Establece el puerto directamente en el código

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('API REST ejecutándose correctamente...');
});
