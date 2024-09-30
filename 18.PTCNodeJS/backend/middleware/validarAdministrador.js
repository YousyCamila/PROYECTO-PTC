const autenticar = require('./verifyToken');

const validarAdministrador = (req, res, next) => {
  autenticar(req, res, () => {
    // Verificar el rol del usuario
    if (req.usuario.rol !== 'administrador') {
      return res.status(403).json({ message: 'Acceso denegado. Se requieren privilegios de administrador.' });
    }
    // Si el rol es válido, continuar
    next();
  });
};

module.exports = { validarAdministrador };
