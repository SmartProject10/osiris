const jwt = require('jsonwebtoken');

async function createUserToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_USER, { expiresIn: "1d" });
}

async function createWorkerToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_WORKER, { expiresIn: "1d" });
}

async function createCompanyToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_COMPANY, { expiresIn: "1d" });
}

module.exports = {
  createUserToken,
  createWorkerToken,
  createCompanyToken
}