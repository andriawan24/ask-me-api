const express = require('express');
const { checkSchema } = require('express-validator');
const { questionValidation } = require('../schemas/question_validation');
const { getQuestions, createQuestion } = require('../services/question_service');
const authMiddleware = require('../middleware/auth_middleware');

const router = express.Router();

router.get('/', getQuestions);
router.post('/', checkSchema(questionValidation), authMiddleware, createQuestion);

module.exports = router;
