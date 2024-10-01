
const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Suponiendo que el token se envía en el header Authorization

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token.' });
  }

  jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.usuario = decoded; // Asegúrate de que 'decoded' contenga la información del usuario
    next();
  });
};

module.exports = autenticar;

