const express = require('express');
const { default: helmet } = require('helmet');
const { port } = require('./config');
const userRoutes = require('./routes/users-route');
const httpLogger = require('./utils/http-logger');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(httpLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));
app.use('/v1/api/users', userRoutes);

app.listen(port, () => logger.info(`Server listening on port ${port}`));
