const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleGeneralError = require('./middlewares/handleGeneralError');
const corsFilters = require('./middlewares/cors');
const { checkAuthorizedUser } = require('./middlewares/auth');

const auth = require('./routes/auth');
const users = require('./routes/users');
const movies = require('./routes/movies');
const rateLimiter = require('./middlewares/rateLimit');

/**
 * Подключение переменных из .env
 */
require('dotenv').config();

const { PORT = 3001, MONGO_DB_URI = 'mongodb://127.0.0.1:27017/moviedb' } = process.env;

/**
 * Подключение к базе данных
 */
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error('Database connection error', err));

/**
 * Запуск приложения
 * @type {*|Express}
 */
const app = express();

/**
 * Защита от DDoS атак
 * Ограничение кол-во запросов
 * за определенное время
 */
app.use(rateLimiter);

/**
 * Подключаем логгер запросов
 */
app.use(requestLogger);

/**
 * Разные middleware
 */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * CORS
 */
app.use(corsFilters);

/**
 * Роуты приложения
 */
app.use('/', auth);
app.use('/users', checkAuthorizedUser, users);
app.use('/movies', checkAuthorizedUser, movies);

/**
 * Подключаем логгер ошибок
 */
app.use(errorLogger);

/**
 * Middleware Celebrate
 * Обработчик ошибок celebrate
 */
app.use(celebrateErrors());

/**
 * Централизованный обработчик ошибок
 */
app.use(handleGeneralError);

app.listen(PORT);
