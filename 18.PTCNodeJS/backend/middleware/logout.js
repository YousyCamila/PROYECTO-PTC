const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
  };
  
  module.exports = logout;
  