const { validationResult } = require('express-validator');
const { query } = require('../utils/db_helper');

module.exports = {
  getQuestions: async (req, res) => {
    try {
      const { topics_id: topicId, q: searchQuery } = req.query;

      let queryString = `
        SELECT 
          questions.*, 
          topics.id as topic_id, topics.name as topic_name, topics.description as topic_description,
          users.id as user_id, users.name as user_name,
          (SELECT COUNT(answers.id) FROM answers WHERE answers.questions_id = questions.id) as count_answers
        FROM questions 
        INNER JOIN topics ON questions.topics_id = topics.id 
        INNER JOIN users ON questions.users_id = users.id
        WHERE status <> "deleted"
      `;

      if (topicId) {
        queryString += ` AND questions.topics_id = ${topicId}`;
      }

      if (searchQuery) {
        queryString += ` AND questions.title LIKE "%${searchQuery}%" OR questions.text LIKE "%${searchQuery}%"`;
      }

      const questions = await query(queryString);

      return res.status(200).json({
        status: true,
        message: 'Success to get questions',
        data: questions.map((question) => ({
          id: question.id,
          title: question.title,
          text: question.text,
          upvote: question.upvote,
          downvote: question.downvote,
          status: question.status,
          answers_count: question.count_answers,
          created_at: question.created_at,
          topic: {
            id: question.topic_id,
            name: question.topic_name,
            description: question.topic_description,
          },
          user: {
            id: question.user_id,
            name: question.user_name,
          },
        })),
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to get questions ${e.message}`,
        data: null,
      });
    }
  },
  createQuestion: async (req, res) => {
    try {
      const {
        title, text, topics_id: topicsId,
      } = req.body;

      const { userID } = req;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: 'Failed to create questions',
          data: errors.array(),
        });
      }

      const topics = await query('SELECT * FROM topics WHERE id = ?', [topicsId]);
      if (topics.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Topic not found',
          data: null,
        });
      }

      const { insertId } = await query(`
        INSERT INTO questions (title, text, topics_id, users_id) VALUE (?, ?, ?, ?) 
      `, [title, text, topicsId, userID]);

      const result = await query(`
        SELECT 
          questions.*, 
          topics.id as topic_id, topics.name as topic_name, topics.description as topic_description,
          users.id as user_id, users.name as user_name,
          (SELECT COUNT(answers.id) FROM answers WHERE answers.questions_id = questions.id) as count_answers
        FROM questions 
        INNER JOIN topics ON questions.topics_id = topics.id 
        INNER JOIN users ON questions.users_id = users.id
        WHERE status <> "deleted"
        AND questions.id = ?
      `, [insertId]);

      return res.status(200).json({
        status: true,
        message: 'Success to create question',
        data: result.length > 0 ? {
          id: result[0].id,
          title: result[0].title,
          text: result[0].text,
          upvote: result[0].upvote,
          downvote: result[0].downvote,
          status: result[0].status,
          answers_count: result[0].count_answers,
          created_at: result[0].created_at,
          topic: {
            id: result[0].topic_id,
            name: result[0].topic_name,
            description: result[0].topic_description,
          },
          user: {
            id: result[0].user_id,
            name: result[0].user_name,
          },
        } : null,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to create question ${e.message}`,
        data: null,
      });
    }
  },
};
