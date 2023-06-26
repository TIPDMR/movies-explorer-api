const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo, updateProfileUser,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).email(),
  }),
}), updateProfileUser);

module.exports = router;
