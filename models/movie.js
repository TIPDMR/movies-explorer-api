const mongoose = require('mongoose');
const validator = require('validator');

const isUrl = (url) => validator.isURL(url);

const stringField = (field, min = 3, max = false, required = true) => ({
  type: String,
  ...(min && { minlength: [min, `${field} должно быть не короче ${min} символов`] }),
  ...(max && { maxlength: [max, `${field} не должно быть длиннее ${max} символов`] }),
  ...(required && { required: [true, `${field} не может быть пустым`] }),
});

const urlField = (field) => ({
  ...stringField(field),
  validate: {
    validator: isUrl,
    message: `Ссылка на ${field.toLowerCase()} введена неверно`,
  },
});

const movieScheme = new mongoose.Schema({
  country: {
    ...stringField('Страна', 3, 30),
  },
  director: {
    ...stringField('Режиссёр', 2, 30),
  },
  duration: {
    type: Number,
    min: [1, 'Продолжительность должна быть не меньше 1'],
    required: [true, 'Продолжительность не может быть пустой'],
  },
  year: {
    min: [1888, 'Год должен быть действительным, начиная с 1888'],
    max: [new Date().getFullYear(), 'Год не может быть в будущем'],
    ...stringField('Год', 4, 4),
  },
  description: {
    ...stringField('Описание', 10),
  },
  image: urlField('Изображение'),
  trailerLink: urlField('Ссылка на трейлер'),
  thumbnail: urlField('Миниатюра'),
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Владелец не может быть пустым'],
  },
  movieId: {
    type: Number,
    min: [1, 'ID фильма должен быть не меньше 1'],
    required: [true, 'ID фильма не может быть пустым'],
  },
  nameRU:
    {
      ...stringField('Название на русском', 2, 100),
    },
  nameEN: {
    ...stringField('Название на английском', 2, 100),
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieScheme);
