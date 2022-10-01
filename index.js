const express = require('express');
const { default: helmet } = require('helmet');
const path = require('path');
const { port } = require('./config');
const authRoutes = require('./routes/authentication-route');
const httpLogger = require('./utils/http-logger');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World'));
app.use('/v1/api/auth', authRoutes);

app.listen(port, () => logger.info(`Server listening on port ${port}`));
