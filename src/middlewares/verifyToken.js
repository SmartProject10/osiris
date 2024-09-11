const jwt = require('jsonwebtoken');

// Middleware para verificar el token de acceso
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // El token se envía en el formato: "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Token requerido" });

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido o expirado" });

    // Si es válido, almacenamos los datos del usuario en la solicitud
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
