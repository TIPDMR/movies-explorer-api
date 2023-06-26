const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getAllMovies);
router.post('/', celebrate({
  body: Joi.object({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(1),
    year: Joi.number().integer().min(1888).max(new Date().getFullYear()),
    description: Joi.string().required().min(10),
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required().min(1),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
