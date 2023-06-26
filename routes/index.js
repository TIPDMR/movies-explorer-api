const router = require('express')
  .Router();
const auth = require('./auth');
const { checkAuthorizedUser } = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const notFoundPage = require('./notFound');

router.use('/', auth);
router.use('/users', checkAuthorizedUser, users);
router.use('/movies', checkAuthorizedUser, movies);
router.use(notFoundPage);

module.exports = router;
