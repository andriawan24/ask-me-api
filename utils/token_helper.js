const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const generateToken = (data) => jwt.sign({ data }, secretKey, { expiresIn: '24h' });
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  generateToken,
  verifyToken,
};
