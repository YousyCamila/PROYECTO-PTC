const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).send('Acceso denegado.');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verified; // Puedes acceder a los datos del usuario a través de req.usuario
    next();
  } catch (error) {
    res.status(400).send('Token no válido.');
  }
}

module.exports = autenticar;
