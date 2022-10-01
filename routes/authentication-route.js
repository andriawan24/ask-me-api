const express = require('express');
const multer = require('multer');
const os = require('os');
const { checkSchema } = require('express-validator');
const { insertUser } = require('../services/authentication-service');

const router = express.Router();

const upload = multer({ dest: os.tmpdir() });

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

module.exports = router;
