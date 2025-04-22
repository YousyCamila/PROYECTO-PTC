

const authorizeRole = (rolesPermitidos) => {
  return (req, res, next) => {
      const { role } = req.user; // Extraído del token
      if (!rolesPermitidos.includes(role)) {
          return res.status(403).json({ mensaje: 'Acceso denegado: rol insuficiente' });
      }
      next();
  };
};
  
  module.exports = authorizeRole;
  