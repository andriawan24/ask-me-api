const { verifyToken } = require('../utils/token-helper');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        data: null,
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        data: null,
      });
    }

    req.userID = decoded.data.userID;
    return next();
  } catch (e) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized',
      data: null,
    });
  }
};

module.exports = authMiddleware;
