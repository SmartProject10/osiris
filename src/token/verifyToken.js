const jwt = require('jsonwebtoken');

const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_USER, (err, profile) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.profile = profile;
    next();
  });
};

const verifyWorkerToken= (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_WORKER, (err, profile) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.profile = profile;
    next();
  });
};

const verifyCompanyToken= (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_COMPANY, (err, profile) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.profile = profile;
    next();
  });
};

module.exports = {
  verifyUserToken,
  verifyWorkerToken,
  verifyCompanyToken
}
