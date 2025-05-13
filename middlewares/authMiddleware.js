const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Token não fornecido");
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send("Falha na autenticação do token");
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
