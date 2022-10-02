const express = require('express');
const multer = require('multer');
const os = require('os');
const { checkSchema } = require('express-validator');
const { insertUser, signIn, getCredential } = require('../services/authentication-service');
const { verifyToken } = require('../utils/token-helper');

const router = express.Router();

const upload = multer({ dest: os.tmpdir() });

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

router.post(
  '/sign-up',
  upload.single('profile_picture'),
  checkSchema({
    name: {
      isEmpty: {
        negated: true,
        errorMessage: 'Name cannot empty',
      },
      in: ['body'],
    },
    email: {
      isEmpty: {
        negated: true,
        bail: true,
        errorMessage: 'Email cannot empty',
      },
      isEmail: {
        bail: true,
        errorMessage: 'Email format is not valid',
      },
    },
    password: {
      isEmpty: {
        negated: true,
        bail: true,
        errorMessage: 'Password cannot empty',
      },
      isLength: {
        options: {
          min: 8,
          max: 14,
        },
        errorMessage: 'Password length must be 8-14',
      },
    },
  }),
  insertUser,
);
router.post('/sign-in', signIn);
router.get('/me', authMiddleware, getCredential);

module.exports = router;
