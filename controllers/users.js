const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { errorHandler } = require('../utils/errorHandler');
const Conflict = require('../errors/Conflict');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
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
    name, email, password,
  } = req.body;

  const createUser = (hash) => User.create({
    name,
    email,
    password: hash,
  });

  User.findOne({ email })
    .select('+password')
    .then((existingUser) => {
      if (existingUser) {
        return next(new Conflict('Email занят другим пользователем'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => createUser(hash))
    .then((user) => res.status(201).send({
      _id: user._id, email: user.email, name: user.name,
    }))
    .catch(() => next);
};

module.exports.updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;
  const updateProfile = (userName, userEmail) => User.findByIdAndUpdate(
    _id,
    { name: userName, email: userEmail },
    {
      new: true,
      runValidators: true,
    },
  );

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new Conflict('Email занят другим пользователем'));
      }
      return updateProfile(name, email);
    })
    .then((user) => res.status(201).send({
      _id: user._id, email: user.email, name: user.name,
    }))
    .catch(() => next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JwtToken,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).send({ email: user.email, name: user.name });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
  }).send({});
};
