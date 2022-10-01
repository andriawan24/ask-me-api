const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const { projectDir, baseUrlImage } = require('../config');
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
          points: user.points,
          created_at: user.created_at,
          updated_at: user.updated_at,
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
      let imageUrl = null;
      const profilePicture = req.file;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: 'Failed to register',
          data: errors.array(),
        });
      }

      const findUser = await query('SELECT * FROM users WHERE email = ?', [email]);
      if (findUser.length > 0) {
        return res.status(400).json({
          status: false,
          message: 'Failed to register',
          data: [
            {
              param: 'email',
              value: email,
              msg: 'Email is already registered',
              location: 'body',
            },
          ],
        });
      }

      if (profilePicture) {
        const tmpPath = req.file.path;
        const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const filename = `${req.file.filename}.${originalExt}`;
        const targetPath = path.resolve(projectDir, `public/${filename}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            imageUrl = baseUrlImage + filename;
          } catch (err) {
            if (err && err.name === 'ValidationError') {
              res.status(422).json({
                message: err.message,
                fields: err.errors,
              });
            }
          }
        });
      }

      await query('INSERT INTO users (name, email, password, image_url) VALUES (?, ?, ?, ?)', [name, email, password, imageUrl]);
      const newUser = await query('SELECT * FROM users WHERE email = ?', [email]);

      if (newUser.length === 0) {
        return res.status(500).json({
          status: false,
          message: 'Failed to register',
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Success to get users',
        data: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          phone_number: newUser[0].phone_number,
          image_url: newUser[0].image_url,
          points: newUser[0].points,
          created_at: newUser[0].created_at,
          updated_at: newUser[0].updated_at,
        },
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
