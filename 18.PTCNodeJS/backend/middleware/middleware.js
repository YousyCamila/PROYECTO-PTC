const session = require('express-session');

const sessionMiddleware = (app) => {
  app.use(session({
    secret: process.env.COOKIE_SECRET, // Secreto para firmar la cookie de sesión
    resave: false,                      // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: false,           // No guardar sesiones no inicializadas
    cookie: {
      httpOnly: true,                   // No accesible desde JavaScript del lado del cliente
      secure: process.env.NODE_ENV === 'production', // Usar solo en HTTPS en producción
      maxAge: 3600000,                  // 1 hora
    },
  }));
};

module.exports = sessionMiddleware;
