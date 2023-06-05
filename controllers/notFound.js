const NotFoundError = require('../errors/NotFound');

module.exports.notFound = (req, res, next) => next(new NotFoundError('Страница не найдена'));
