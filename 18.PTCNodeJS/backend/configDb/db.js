const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno

const connectDB = async () => {
  try {
    // Conexión a MongoDB sin opciones obsoletas
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1); // Salir del proceso en caso de error
  }
};

module.exports = connectDB;