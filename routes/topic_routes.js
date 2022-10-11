const express = require('express');
const { checkSchema } = require('express-validator');
const { topicValidation } = require('../schemas/topic_validation');
const {
  getTopics, createTopic, editTopic, deleteTopic,
} = require('../services/topic_service');

const router = express.Router();

router.get('/', getTopics);
router.post('/', checkSchema(topicValidation), createTopic);
router.put('/:id', editTopic);
router.delete('/:id', deleteTopic);

module.exports = router;
