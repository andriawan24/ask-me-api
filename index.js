const express = require('express');
const { default: helmet } = require('helmet');
const path = require('path');
const cors = require('cors');
const { defaultPort } = require('./config');
const authRoutes = require('./routes/auth_routes');
const questionRoutes = require('./routes/question_routes');
const topicRoutes = require('./routes/topic_routes');
const normalizePort = require('./utils/helper');
const logger = require('./utils/logger');
const httpLogger = require('./utils/http_logger');

const app = express();

app.use(cors());
app.use(helmet());
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public')));

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/questions', questionRoutes);
app.use('/v1/api/topics', topicRoutes);

const port = normalizePort(process.env.PORT || defaultPort);
app.set('port', port);
app.listen(port, () => logger.info(`Server listening on port ${port}`));
