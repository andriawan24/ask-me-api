require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  db: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  projectDir: `${__dirname}/../`,
  baseUrl: process.env.BASE_URL,
  baseUrlImage: process.env.BASE_URL_IMG,
  saltRound: 10,
  secretKey: process.env.SECRET_KEY,
  mailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  mailSender: process.env.EMAIL_USERNAME,
};
