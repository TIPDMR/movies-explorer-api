# **Дипломный проект: Movies REST API**
## Технологии
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- Node.js и Express.js используются для создания сервера.
- MongoDB используется для хранения данных, а Mongoose - для работы с ним.
- bcryptjs используется для хеширования паролей пользователей.
- jsonwebtoken используется для создания и проверки JWT токенов для аутентификации пользователей.
- celebrate и Joi используются для валидации входящих запросов.
- winston и morgan используются для логирования запросов и ошибок.
___

## Описание

**Movies Explorer REST API** - это сервер для проекта Movies Explorer, выполняющий роль интерфейса между базой данных проекта и
клиентом.

**[Movies Explorer](https://github.com/TIPDMR/movies-explorer-frontend)** - это веб-приложение, позволяющее пользователям искать фильмы, сохранять в свою личную коллекцию и
управлять ей.

___

## Функциональные возможности

- **Регистрация и авторизация:** API позволяет пользователям регистрироваться, передавая свой адрес электронной почты и
  пароль. Затем они могут войти в систему, используя свои данные.
- **CRUD операции с фильмами:** API позволяет создавать, считывать, обновлять и удалять фильмы в базе данных. Пользователи
  могут добавлять фильмы в свою коллекцию, просматривать свою коллекцию и удалять фильмы из неё.
- **Управление профилем пользователя:** Пользователи могут обновлять свои профильные данные - имя и адрес электронной почты.
- **Поиск фильмов:** Пользователи могут искать фильмы по названию, году выпуска, стране, режиссеру и другим параметрам.

___

## Установка и запуск
Перед запуском убедитесь, что у вас установлен Node.js и MongoDB.

1) Клонируйте репозиторий на ваш компьютер.

```
git clone https://github.com/TIPDMR/movies-explorer-api
```

2) Установите зависимости проекта.

```
cd movies-explorer-api && npm install
```
3) Наcтройте CORS

    1. Откройте файл `utils/constants.js`
    2. Добавьте ваш домен в константу `ALLOWED_DOMAIN_NAME`


4) Запустите сервер.

```
npm run start
```

Ваш сервер будет запущен и готов к использованию. В случае разработки можно использовать команду `npm run dev` для запуска сервера с функцией hot-reload.


## Ссылки

Backend Movies Explorer REST API: https://api.movies.best-mesto.ru

Frontend Movies Explorer: https://movies.best-mesto.ru

Frontend Movies Explorer Source Code: https://movies.best-mesto.ru
