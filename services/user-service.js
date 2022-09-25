const { query } = require('../utils/db-helper');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const result = await query('SELECT * FROM users WHERE id <> ?', [2]);
      return res.status(200).json({
        status: true,
        message: 'Success to get users',
        data: result.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          image_url: user.image_url,
        })),
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to get users ${e.message}`,
        data: null,
      });
    }
  },
  insertUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          status: false,
          message: 'Please enter the required field [name, email, password]',
          data: null,
        });
      }

      await query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
      const user = await query('SELECT * FROM users WHERE email = ?', [email]);

      return res.status(200).json({
        status: true,
        message: 'Success to get users',
        data: user.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone_number: u.phone_number,
          image_url: u.image_url,
        })),
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: `Failed to get users ${e.message}`,
        data: null,
      });
    }
  },
};
