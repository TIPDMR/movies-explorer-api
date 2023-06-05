// models/user.js
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Unauthorized = require('../errors/Unauthorized');

const stringField = (field, min = 3, max = false, required = true) => ({
  type: String,
  ...(min && { minlength: [min, `${field} должен быть не короче ${min} символов`] }),
  ...(max && { maxlength: [max, `${field} не должен быть длиннее ${max} символов`] }),
  ...(required && { required: [true, `${field} не может быть пустым`] }),
});

const userSchema = new mongoose.Schema({
  email: {
    ...stringField('Email', 2),
    lowercase: true,
    unique: [true, 'Email занят другим пользователем'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email адрес',
    },
  },
  password: {
    ...stringField('Пароль'),
    select: false,
  },
  name: {
    ...stringField('Имя пользователя', 2, 30, false),
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
