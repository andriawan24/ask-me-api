const { validationResult } = require('express-validator');
const { query } = require('../utils/db_helper');

module.exports = {
  getTopics: async (req, res) => {
    try {
      const result = await query('SELECT * FROM topics');
      return res.status(200).json({
        status: true,
        message: 'Success to get topics',
        data: result,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to get topics ${e.message}`,
        data: null,
      });
    }
  },
  createTopic: async (req, res) => {
    try {
      const { name, description } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: 'Failed to create topics',
          data: errors.array(),
        });
      }

      const { insertId } = await query('INSERT INTO topics (name, description) VALUE (?, ?)', [name, description]);
      const result = await query('SELECT * FROM topics WHERE id = ?', [insertId]);

      return res.status(200).json({
        status: true,
        message: 'Success to create topic',
        data: result.length > 0 ? result[0] : null,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to create topic ${e.message}`,
        data: null,
      });
    }
  },
  editTopic: async (req, res) => {
    try {
      const { name, description } = req.body;
      const { id } = req.params;

      const topic = await query('SELECT * FROM topics WHERE id = ?', [id]);
      if (topic.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Topic not found',
          data: null,
        });
      }

      await query('UPDATE topics SET name = ?, description = ?', [name ?? topic[0].name, description ?? topic[0].description]);
      const result = await query('SELECT * FROM topics WHERE id = ?', [id]);

      return res.status(200).json({
        status: true,
        message: 'Success to edit topic',
        data: result.length > 0 ? result[0] : null,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to edit topic ${e.message}`,
        data: null,
      });
    }
  },
  deleteTopic: async (req, res) => {
    try {
      const { id } = req.params;

      const topic = await query('SELECT * FROM topics WHERE id = ?', [id]);
      if (topic.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Topic not found',
          data: null,
        });
      }

      await query('DELETE FROM topics WHERE id = ?', [id]);

      return res.status(200).json({
        status: true,
        message: 'Success to delete topic',
        data: null,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to delete topic ${e.message}`,
        data: null,
      });
    }
  },
};
