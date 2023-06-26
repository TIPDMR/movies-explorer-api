const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 300,
  message: 'Слишком много запросов с этого IP, повторите попытку через 15 минут.',
});

module.exports = rateLimiter;
