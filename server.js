const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv/config');
const router = require('./routesIndex');

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
    level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
app.use(expressLogger);

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    logger.info('Server running on port %d', process.env.PORT || 3000);
});

module.exports = app;
