
const jwt = require('jsonwebtoken');

// Middleware para verificar el token de acceso
const authenticateToken = (req, res, next) => {

  /* const cookie = req.headers.cookie;
 
   if (!cookie || cookie == '')
     return res.status(403).json({ message: "Token inválido o expirado" });
 
   const token = cookie.split('=')[1];
   */
  const {token} = req.cookies;

  if (!token) return res.status(401).json({ message: "Token requerido" });

  // Verificar el token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido o expirado" });

    // Si es válido, almacenamos los datos del usuario en la solicitud
    req.user = user;


    next();
  });
};

module.exports = authenticateToken;
