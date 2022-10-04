const express = require('express');
const { default: helmet } = require('helmet');
const path = require('path');
const cors = require('cors');
const { port } = require('./config');
const authRoutes = require('./routes/authentication-route');
const httpLogger = require('./utils/http-logger');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(helmet());
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World'));
app.use('/v1/api/auth', authRoutes);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portFix = parseInt(val, 10);

  if (Number.isNaN(portFix)) {
    // named pipe
    return val;
  }

  if (portFix >= 0) {
    // port number
    return portFix;
  }

  return false;
}

const portFix = normalizePort(process.env.PORT || port);
app.set('port', portFix);

app.listen(portFix, () => logger.info(`Server listening on port ${portFix}`));
