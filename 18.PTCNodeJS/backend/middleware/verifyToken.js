const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token. Se requiere autenticación.' });
  }

  // Verificar el token usando la clave secreta desde una variable de entorno
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Diferenciar entre token expirado y token inválido
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'El token ha expirado. Por favor, vuelve a iniciar sesión.' });
      } else {
        return res.status(403).json({ message: 'Token inválido.' });
      }
    }
    req.usuario = decoded; // Almacenar la información decodificada del usuario en `req.usuario`
    next(); // Continuar con la siguiente función en la cadena de middleware
  });
};

module.exports = autenticar;
