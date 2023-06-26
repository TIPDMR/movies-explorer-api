const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const router = require('./routes/index');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
const handleGeneralError = require('./middlewares/handleGeneralError');
const corsFilters = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimit');

/**
 * Подключение переменных из .env
 */
require('dotenv')
  .config();

const {
  PORT = 3001,
  MONGO_DB_URI = 'mongodb://127.0.0.1:27017/moviedb',
} = process.env;

/**
 * Подключение к базе данных
 */
mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * CORS
 */
app.use(corsFilters);

/**
 * Роуты приложения
 */
app.use(router);

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
