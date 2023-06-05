const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { errorHandler } = require('../utils/errorHandler');
const Conflict = require('../errors/Conflict');

require('dotenv')
  .config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;
const JwtToken = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201)
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Email занят другим пользователем'));
      }
      return errorHandler(err, res, next);
    });
};

module.exports.updateProfileUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(201)
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Email занят другим пользователем'));
      }
      return errorHandler(err, res, next);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JwtToken, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
  })
    .send({});
};
