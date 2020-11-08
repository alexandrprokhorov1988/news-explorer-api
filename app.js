const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes/index');
const { NOT_FOUND_ERR } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const {
  limiter, DB_NAME, DB_OPTIONS, PORT, CORS_OPTIONS,
} = require('./utils/config');

const app = express();

mongoose.connect(DB_NAME, DB_OPTIONS);

app.use(limiter);
app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);
app.use(() => {
  throw new NotFoundError(NOT_FOUND_ERR);
});
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
