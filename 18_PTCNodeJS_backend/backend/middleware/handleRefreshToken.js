const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const handleRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(403); // No autorizado

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Refresh token inválido o expirado

    const newAccessToken = generateAccessToken({ id: user.id, role: user.role });
    res.json({ accessToken: newAccessToken });
  });
};

module.exports = handleRefreshToken;
