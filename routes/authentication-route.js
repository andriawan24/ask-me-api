const express = require('express');
const multer = require('multer');
const os = require('os');
const { checkSchema } = require('express-validator');
const {
  insertUser, signIn, getCredential, sendForgotPasswordToken,
} = require('../services/authentication-service');
const authMiddleware = require('../middleware/auth_middleware');
const { nameValidation, emailValidation, passwordValidation } = require('../schemas/user_validation');

const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post('/sign-up', upload.single('profile_picture'), checkSchema(nameValidation), checkSchema(emailValidation), checkSchema(passwordValidation), insertUser);
router.post('/sign-in', checkSchema(emailValidation), checkSchema(passwordValidation), signIn);
router.get('/me', authMiddleware, getCredential);
router.post('/forgot-password', checkSchema(emailValidation), sendForgotPasswordToken);

module.exports = router;
