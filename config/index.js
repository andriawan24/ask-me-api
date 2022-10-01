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
};
